import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../dataTypes';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL2!: string;
  isLoginError = new EventEmitter<boolean>(false);
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient, private router: Router) {}

  userSignUp(data: SignUp): Observable<boolean> {
    let request = {
      ...data,
      IsSeller: false,
    };
    return this.httpClient.post<boolean>(
      'https://localhost:44352/api/Authenticate/Register',
      data
    );
    // this.httpClient
    //   .post('http://localhost:3000/users', data, {
    //     observe: 'response',
    //   })
    //   .subscribe((result) => {
    //     this.isUserLoggedIn.next(true);
    //     this.router.navigate(['/']);
    //   });
  }
  userLogin(data: Login, isEmail: boolean): Observable<string> {
    return this.httpClient.get<string>(
      'https://localhost:44352/api/Authenticate/' +
        data.Name +
        '&' +
        data.Password
    );
    // if (isEmail) {
    //   this.URL2 = `http://localhost:3000/users?email=${data.name}&password=${data.password}`;
    // } else {
    //   this.URL2 = `http://localhost:3000/users?name=${data.name}&password=${data.password}`;
    // }
    // this.httpClient
    //   .get(this.URL2, { observe: 'response' })
    //   .subscribe((result: any) => {
    //     if (result && result.body && result.body.length > 0) {
    //       this.isLoginError.emit(false);
    //       localStorage.setItem('user', JSON.stringify(result.body));
    //       this.router.navigate(['/']);
    //     } else {
    //       // alert('Wrong Credentials');
    //       this.isLoginError.emit(true);
    //     }
    //   });
  }

  reloadUser() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
}
