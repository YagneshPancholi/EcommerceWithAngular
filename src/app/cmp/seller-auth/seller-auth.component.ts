import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/dataTypes';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'yagu-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private sellerService:SellerService, private router : Router){}
  ngOnInit(){

  }
  signUp(data : SignUp):void{
    this.sellerService.userSignup(data).subscribe(
      (result)=>{
        // console.log(result);
        if(result){
          this.router.navigate(['seller-home']);
        }
      }
    );
  }
}
