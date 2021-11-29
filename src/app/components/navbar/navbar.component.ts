import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}')['username'];
  }

  public getLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  public getUser(){
    return this.currentUser;
  }

  public logout(){
    this.authService.logout();
  }

}
