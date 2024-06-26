import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cmp/header/header.component';
import { HomeComponent } from './cmp/home/home.component';
import { SellerAuthComponent } from './cmp/seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './cmp/seller-home/seller-home.component';
import { CommonModule } from '@angular/common';
import { SellerAddProductComponent } from './cmp/seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './cmp/seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './cmp/search/search.component';
import { FooterComponent } from './cmp/footer/footer.component';
import { ProductDetailsComponent } from './cmp/product-details/product-details.component';
import { UserAuthComponent } from './cmp/user-auth/user-auth.component';
import { CartPageComponent } from './cmp/cart-page/cart-page.component';
import { MyOrdersComponent } from './cmp/my-orders/my-orders.component';
import { CheckoutComponent } from './cmp/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    FooterComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
