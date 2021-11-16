import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {

  }

  public onAddUser(signUpForm: NgForm): void {
    this.userService.addUser(signUpForm.value).subscribe(
      (response: User) => {
        console.log(response);
        alert('Registration successfully made!');
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }

}
