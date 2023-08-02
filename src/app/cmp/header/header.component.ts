import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yagu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((result: any) => {
      if (result.url) {
        if (localStorage.getItem('seller') && result.url.includes('seller')) {
          console.warn('in seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            const sellerStorage = localStorage.getItem('seller');
            let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          console.warn('outside of seller');
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
}
