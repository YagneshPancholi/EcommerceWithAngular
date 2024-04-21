import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Cart, Product } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'yagu-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  productData: Product | undefined;
  removeCart = false;
  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId &&
      this.productService
        .getProductById(Number(productId))
        .subscribe((result) => {
          this.productData = result;
        });
    let cartData = localStorage.getItem('localCart');
    if (cartData && productId) {
      let items = JSON.parse(cartData);
      items = items.filter((item: Product) => item.id.toString() == productId);
      if (items.length && items.length > 0) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
  }
  productQuantity: number = 1;
  handleQuantity(val: string) {
    if (val == 'min' && this.productQuantity > 1) {
      this.productQuantity--;
    } else if (val == 'plus' && this.productQuantity < 10) {
      this.productQuantity++;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      console.log(this.productData);
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // user is logged in
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((data) => {
          if (data) {
            alert('Product is added to cart');
          }
        });
      }
    }
  }
  RemoveToCart(id: number) {
    this.productService.localRemoveToCart(id);
    this.removeCart = false;
  }
}
