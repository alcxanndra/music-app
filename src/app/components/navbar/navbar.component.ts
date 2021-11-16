import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getLoggedIn(){
    console.log(AppComponent.loggedIn)
    return AppComponent.loggedIn;
  }

  public logout(){
    console.log(AppComponent.loggedIn)
    AppComponent.loggedIn = false;
  }

}
