import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API = 'http://localhost:8080/';

const jwtHelper = new JwtHelperService();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  public register(name:string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      name,
      username,
      email,
      password
    }, httpOptions);
  }

  public logout() :void {    
    localStorage.clear(); 
  }    

  public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      if (token){
        return !jwtHelper.isTokenExpired(token);
      }
      return false;
  }
}