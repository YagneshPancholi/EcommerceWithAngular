import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cart, Login, Product, SignUp, User } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'yagu-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  @ViewChild('userLogin') userLogin: NgForm | undefined;
  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.userService.reloadUser();
  }

  showLogin: boolean = false;
  showLoginInfo: string | undefined = '';
  LoginOrSignUp() {
    this.showLogin = !this.showLogin;
  }
  signUp(data: SignUp) {
    this.userService.userSignUp(data);
  }
  login(data: Login) {
    if (data.emailOrName.includes('@')) {
      this.userService.userLogin(data, true);
    } else {
      this.userService.userLogin(data, false);
    }
    this.userService.isLoginError.subscribe((result) => {
      if (result) {
        this.showLoginInfo = 'Wrong Credentials';
      } else {
        this.showLoginInfo = 'Login Success';
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 500);
      }
      setTimeout(() => {
        this.showLoginInfo = undefined;
        this.userLogin?.reset();
      }, 3000);
    });
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe(() => {
            console.warn('prduct added to DB');
          });
          if (cartDataList.length == index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
  }
}
