import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'yagu-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  @ViewChild('addProduct') addProduct: NgForm | undefined;

  constructor(private productService: ProductService) {}

  addProducts(data: Product) {
    this.productService.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product Added Successfully..';
        this.addProduct?.reset();
      } else {
        this.addProductMessage = 'Product Addition Unsuccessfull..';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }
}
