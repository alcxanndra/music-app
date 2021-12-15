import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UploadedImage } from 'src/app/models/uploaded-image';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/file-upload.service';
import { ImageService } from 'src/app/services/image.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

const profileImageUploadUrl: string = 'http://localhost:8080/uploads/users';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  profilePicture!: string;
  isEditMode!: boolean;
  loading = false;
  submitted = false;
  currentFileUpload!: any;
  changeImage = false;
  clicked: boolean = false;
  imageError!: string;
  imageToShow: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
      private authService: AuthService,
      private tokenStorage: TokenStorageService,
      private uploadService: UploadFileService,
      private imageService: ImageService
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

      this.userService.fetchProfileImage(this.id.toString())
      .subscribe(image => this.createImage(image),
        err => this.handleImageRetrievalError(err));

    console.log("Edit mode: " + this.isEditMode);

    }

    private handleImageRetrievalError(err: Error) {
        console.error(err);
        this.alertService.error("Problem retrieving profile photo.");
    }

    private createImage(image: Blob) {
        if (image && image.size > 0) {
          let reader = new FileReader();
    
          reader.addEventListener("load", () => {
            this.imageToShow = reader.result;
          }, false);
    
          reader.readAsDataURL(image);
        } 
    }
      

    change($event: any) {
        this.changeImage = true;
    }

    upload() {
        this.clicked = true;

        let uploadUrl = `${profileImageUploadUrl}/${this.id}/profileImage`;
        this.uploadService.pushFileToStorage(this.currentFileUpload.file, uploadUrl)
            .subscribe(event => this.handleEvent(event),
                err => this.handleError(err));
    }

    handleEvent(event: HttpEvent<{}>) {
        if (event instanceof HttpResponse) {
            let body = event.body;
            this.handleResponse(body);
        }

        this.currentFileUpload = undefined;
    }

    handleResponse(data: any) {
        console.log(data);
        this.currentFileUpload = undefined;
        this.clicked = false;
    }

    handleError(err: Error) {
      console.error("Error is", err);
      this.imageError = err.message;
      this.clicked = false;
    }

    onUploadedImage(image: UploadedImage) {
        this.imageError = this.imageService.validateImage(image);

        if (!this.imageError) {
            this.currentFileUpload = image;
        }
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
    //   this.updateUser();
  }

  public setToEditMode(){
    this.isEditMode = true;
  }

  public updateUser() {
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
                this.router.navigate(['../../'], { relativeTo: this.route });

              },
              error: error => {
                //   this.alertService.error(error);
                console.log(error);
                this.loading = false;
              }
          });
  }
}
