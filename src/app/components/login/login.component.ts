import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  errorMessage = '';
  isLoginFailed!: boolean;
  isLoggedIn!: boolean;
  roles!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private alertService: AlertService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    const username  = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;

    this.authService.login(username, password).subscribe(
      (      data: { accessToken: any; }) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/songs']);

      },
      (      err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        if (err.error.message.includes('Bad credentials')){
          alert('Invalid username or password!');
        }
        this.isLoginFailed = true;
      }
    );
  }
}