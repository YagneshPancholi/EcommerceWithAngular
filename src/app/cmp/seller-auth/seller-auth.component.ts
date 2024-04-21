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
    this.sellerService.sellerSignup(data).subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
    this.router.navigate(['/']);
  }

  login(data: Login): void {
    this.showLoginInfo = '';
    this.sellerService.sellerLogin(data, false).subscribe((result: string) => {
      console.warn(result);
      if (result) {
        localStorage.setItem('seller', result);
        this.sellerService.isLoginError.emit(false);
        this.router.navigate(['seller-home']);
      }
    });
    this.sellerService.isLoginError.emit(false);
    this.router.navigate(['seller-home']);
    // this.router.navigate(['/']);
    // if (data.Name.includes('@')) {
    //   this.sellerService.sellerLogin(data, true);
    // } else {
    //   this.sellerService.sellerLogin(data, false);
    // }
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
