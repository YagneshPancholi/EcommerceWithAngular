import { Component } from '@angular/core';
import { Product } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'yagu-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  productDeleteMessage: undefined | string;
  deleteIcon = faTrash;
  updateIcon = faPen;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    this.productService.getProducts().subscribe((result) => {
      this.productList = result;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productDeleteMessage = 'Product Deleted Successfully..';
        this.fetchAllProducts();
      } else {
        this.productDeleteMessage =
          'Oops, There Is an Error WHile Deleting Product';
      }
      setTimeout(() => (this.productDeleteMessage = undefined), 2500);
    });
  }
}
