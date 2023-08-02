import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from 'src/app/dataTypes';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'yagu-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  showLogin: boolean = false;
  showLoginInfo: string = '';

  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnInit() {
    this.sellerService.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.sellerService.sellerSignup(data);
  }

  login(data: Login): void {
    this.showLoginInfo = '';
    this.sellerService.sellerLogin(data);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.showLoginInfo = 'Wrong Credentials!!!';
      } else {
        this.showLoginInfo = 'Login Success';
      }
    });
  }

  LoginOrSignUp() {
    this.showLogin = !this.showLogin;
  }
}
