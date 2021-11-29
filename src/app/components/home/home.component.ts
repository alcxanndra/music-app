import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}')['username'];
  }

}
