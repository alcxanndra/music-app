import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  profilePicture!: string;
  isEditMode = false;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
      private authService: AuthService,
      private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
      this.isEditMode = this.route.snapshot.params['id'];
      this.id = JSON.parse(localStorage.getItem('user') || '{}')['id'];
      this.form = this.formBuilder.group({
          name: ['', Validators.required],
          description: [''],
          url: [''],
          location: [''],
      });

      this.userService.getUserById(this.id)
              .pipe(first())
              .subscribe(x => {
                  this.form.patchValue(x);
                  console.log(x);
                  this.profilePicture = x.profilePicture || '/assets/images/users/profile-placeholder.png';
              }
              );
      }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.updateUser();
  }

  public setToEditMode(){
    this.isEditMode = true;
  }

  private updateUser() {
      this.userService.updateUser(this.form.value, this.id)
          .pipe(first())
          .subscribe({
              next: (data) => {
                //   this.alertService.success('Profile updated', { keepAfterRouteChange: true });
                console.log('Profile updated');
                console.log(data);
                console.log(localStorage.getItem('token'));
                console.log(localStorage.getItem('user'));
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(data));

              },
              error: error => {
                //   this.alertService.error(error);
                console.log(error);
                this.loading = false;
              }
          });
  }
}
