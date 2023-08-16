import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/dataTypes';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'yagu-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchResult : undefined|Product[];
  searchErrorMessage : string = "Oops, There Is No Item With This Search....";

  constructor(private productService : ProductService, private activateRoute : ActivatedRoute,private router : Router){
  }
  ngOnInit(){
    let query = this.activateRoute.snapshot.paramMap.get('query');
    query && this.productService.searchProducts(query).subscribe((result)=>{
      if(result.length != 0){
        this.searchResult = result;
      }else{
        this.searchResult = undefined;
        setTimeout(()=>(this.router.navigate(['/'])),3000);
      }
    });
  }
}
