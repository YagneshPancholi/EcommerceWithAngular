import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../dataTypes';
import { BehaviorSubject, Observable } from 'rxjs';
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

  sellerSignup(data: SignUp): Observable<boolean> {
    let request = {
      ...data,
      IsSeller: true,
    };
    this.isSellerLoggedIn.next(true);
    return this.httpClient.post<boolean>(
      'https://localhost:44352/api/Authenticate/Register',
      data
    );

    // this.httpClient
    //   .post(this.URL, data, { observe: 'response' })
    //   .subscribe((result) => {
    //     this.isSellerLoggedIn.next(true);
    //     localStorage.setItem('seller', JSON.stringify(result.body));
    //     this.router.navigate(['seller-home']);
    //   });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  sellerLogin(data: Login, isEmail: boolean): Observable<string> {
    this.isSellerLoggedIn.next(true);
    return this.httpClient.get<string>(
      'https://localhost:44352/api/Authenticate/' +
        data.Name +
        '&' +
        data.Password
    );

    // if (isEmail) {
    //   this.URL2 = `http://localhost:3000/seller?email=${data.Name}&password=${data.Password}`;
    // } else {
    //   this.URL2 = `http://localhost:3000/seller?name=${data.Name}&password=${data.Password}`;
    // }

    // this.httpClient
    //   .get(this.URL2, { observe: 'response' })
    //   .subscribe((result: any) => {
    //     if (result && result.body && result.body.length > 0) {
    //       this.isLoginError.emit(false);
    //       localStorage.setItem('seller', JSON.stringify(result.body));
    //       this.router.navigate(['seller-home']);
    //     } else {
    //       // alert('Wrong Credentials');
    //       this.isLoginError.emit(true);
    //     }
    //   });
  }
}
