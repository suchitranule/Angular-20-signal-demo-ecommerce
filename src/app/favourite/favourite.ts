import { Component, inject } from '@angular/core';
import { ProductService } from '../product-service';
import { TruncatePipe } from '../truncate-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourite',
  imports: [TruncatePipe,CommonModule],
  templateUrl: './favourite.html',
  styleUrl: './favourite.css',
})
export class Favourite {
  public wishlistProduct:any = [];

  public productService = inject(ProductService);

  ngOnInit() {
    const wishList = this.productService.wishListArray();
    const allProductMap = this.productService.productMap();
    wishList.forEach(id => {
      this.wishlistProduct.push(allProductMap.get(id));
    })
    
  }

}
