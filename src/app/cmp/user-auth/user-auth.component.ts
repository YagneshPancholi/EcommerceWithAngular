import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login, SignUp } from 'src/app/dataTypes';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'yagu-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  @ViewChild('userLogin') userLogin: NgForm | undefined;
  constructor(private userService: UserService) {}
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
      }
      setTimeout(() => {
        this.showLoginInfo = undefined;
        this.userLogin?.reset();
      }, 3000);
    });
  }
}
