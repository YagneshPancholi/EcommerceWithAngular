import { Component } from '@angular/core';

@Component({
  selector: 'yagu-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  ngOnInit(){

  }
  signUp(data : object):void{
    console.warn(data);
  }
}
