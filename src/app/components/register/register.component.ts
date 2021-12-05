import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form!: FormGroup;
    submitted = false;
    errorMessage = '';
    

    constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
      ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            username: ['', Validators.required, Validators.minLength(6)],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        const name  = this.form.controls['name'].value;
        const username  = this.form.controls['username'].value;
        const email = this.form.controls['email'].value;
        const password = this.form.controls['password'].value;

        this.authService.register(name, username, email, password).subscribe(
          (      data: any) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          (      err: { error: { message: string; }; }) => {
            this.errorMessage = err.error.message;
          }
        );
    }

    onReset() {
        this.submitted = false;
        this.form.reset();
    }
}
