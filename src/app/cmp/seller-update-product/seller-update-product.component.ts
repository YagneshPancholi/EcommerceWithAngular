import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'yagu-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  updateProductMessage: undefined | string;
  oldData: Product | undefined;

  constructor(
    private currentRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.currentRoute.snapshot.paramMap.get('id');
    productId &&
      this.productService
        .getProductById(Number(productId))
        .subscribe((data) => {
          this.oldData = data;
        });
  }

  UpdateThisProduct(data: Product) {
    if (this.oldData) {
      data.id = this.oldData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.updateProductMessage = 'Product Has Updated...';
      } else {
        this.updateProductMessage = 'Product Update Failed';
      }
      setTimeout(() => {
        this.updateProductMessage = undefined;
        this.router.navigate(['/seller-home']);
      }, 2000);
    });
  }
}
