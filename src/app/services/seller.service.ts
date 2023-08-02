import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../dataTypes';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  URL: string = 'http://localhost:3000/seller';
  URL2!: string;
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {}

  sellerSignup(data: SignUp) {
    this.httpClient
      .post(this.URL, data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  sellerLogin(data: Login) {
    this.URL2 = `http://localhost:3000/seller?email?=${data.emailOrName}&name?=${data.emailOrName}&password=${data.password}`;

    this.httpClient
      .get(this.URL2, { observe: 'response' })
      .subscribe((result: any) => {
        if (result.body && result.body.length > 0) {
          // alert('Login Successfully');
          console.log(result);
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          // alert('Wrong Credentials');
          this.isLoginError.emit(true);
        }
      });
  }
}
