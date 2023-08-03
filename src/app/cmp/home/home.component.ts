import { Component } from '@angular/core';
import { Product } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'yagu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularProducts: undefined | Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.popularProducts().subscribe((result) => {
      this.popularProducts = result;
    });
  }
}
