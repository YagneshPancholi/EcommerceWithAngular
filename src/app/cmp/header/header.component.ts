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
  userName: string = '';
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
        } else if (localStorage.getItem('user')) {
          // console.warn('in user area');
          this.menuType = 'user';
          if (localStorage.getItem('user')) {
            const userStorage = localStorage.getItem('user');
            let userData = userStorage && JSON.parse(userStorage)[0];
            this.userName = userData.name;
          }
        } else {
          // console.warn('outside of seller');
          this.menuType = 'default';
        }
      }
    });
  }
  logout(data: string) {
    if (data == 'seller') {
      localStorage.removeItem('seller');
    }
    if (data == 'user') {
      localStorage.removeItem('user');
    }
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
  redirectToProductDetails(id: number) {
    this.router.navigate([`/details/${id}`]);
  }
}
