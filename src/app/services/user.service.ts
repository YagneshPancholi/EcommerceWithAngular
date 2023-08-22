import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../dataTypes';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL2!: string;
  isLoginError = new EventEmitter<boolean>(false);
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    this.httpClient
      .post('http://localhost:3000/users', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        this.isUserLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      });
  }
  userLogin(data: Login, isEmail: boolean) {
    if (isEmail) {
      this.URL2 = `http://localhost:3000/users?email=${data.emailOrName}&password=${data.password}`;
    } else {
      this.URL2 = `http://localhost:3000/users?name=${data.emailOrName}&password=${data.password}`;
    }
    this.httpClient
      .get(this.URL2, { observe: 'response' })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length > 0) {
          this.isLoginError.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        } else {
          // alert('Wrong Credentials');
          this.isLoginError.emit(true);
        }
      });
  }

  reloadUser() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
}
