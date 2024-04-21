import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './cmp/home/home.component';
import { SellerAuthComponent } from './cmp/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './cmp/seller-home/seller-home.component';
import { AuthGuard } from './guard/auth.guard';
import { SellerAddProductComponent } from './cmp/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './cmp/seller-update-product/seller-update-product.component';
import { SearchComponent } from './cmp/search/search.component';
import { ProductDetailsComponent } from './cmp/product-details/product-details.component';
import { UserAuthComponent } from './cmp/user-auth/user-auth.component';
import { CartPageComponent } from './cmp/cart-page/cart-page.component';
import { CheckoutComponent } from './cmp/checkout/checkout.component';
import { MyOrdersComponent } from './cmp/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:query',
    component: SearchComponent,
  },
  {
    path: 'details/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'user-auth',
    component: UserAuthComponent,
  },
  {
    component: CartPageComponent,
    path: 'cart-page',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',
  },
  {
    component: MyOrdersComponent,
    path: 'my-orders',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
