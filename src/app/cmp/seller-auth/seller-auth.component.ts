import { Component } from '@angular/core';
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

  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.sellerService.sellerSignup(data);
  }

  login(data: Login): void {
    this.showLoginInfo = '';
    if (data.emailOrName.includes('@')) {
      this.sellerService.sellerLogin(data, true);
    } else {
      this.sellerService.sellerLogin(data, false);
    }
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.showLoginInfo = 'Wrong Credentials!!!';
      }
    });
  }

  LoginOrSignUp() {
    this.showLogin = !this.showLogin;
  }
}
