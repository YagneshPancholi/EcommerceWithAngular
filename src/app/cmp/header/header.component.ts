import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'yagu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Product[];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.router.events.subscribe((result: any) => {
      if (result.url) {
        if (localStorage.getItem('seller') && result.url.includes('seller')) {
          // console.warn('in seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            const sellerStorage = localStorage.getItem('seller');
            let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          // console.warn('outside of seller');
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const elmt = query.target as HTMLInputElement;
      this.productService.searchProducts(elmt.value).subscribe((result) => {
        if (result.length > 4) {
          result.length = 4;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(query: string) {
    this.router.navigate([`search/${query}`]);
  }
}
