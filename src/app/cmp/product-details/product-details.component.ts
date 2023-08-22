import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/dataTypes';
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
  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId &&
      this.productService
        .getProductById(Number(productId))
        .subscribe((result) => {
          this.productData = result;
        });
  }
  productQuantity: number = 1;
  handleQuantity(val: string) {
    if (val == 'min' && this.productQuantity > 1) {
      this.productQuantity--;
    } else if (val == 'plus' && this.productQuantity < 10) {
      this.productQuantity++;
    }
  }
}
