import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public getUser(signInForm: NgForm): void {
    this.userService.getUserById(1).subscribe(
      (response: User) => {
        console.log(response);
        AppComponent.loggedIn = true;
        this.router.navigate(['/songs']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }

}
