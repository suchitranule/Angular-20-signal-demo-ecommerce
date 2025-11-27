import { ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../product-service';
import { TruncatePipe } from '../truncate-pipe';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart-service';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [CommonModule , TruncatePipe, FontAwesomeModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  public productService = inject(ProductService);
  private subscription:Subscription|undefined;

  private sortColumDir:{[key:string]:boolean} = {'id':true,'title':true,'description':true,'price':true};
  public cartService= inject(CartService);
  public allProduct:any = [];
  faHeartRegular = faHeartRegular;
  faHeartSolid =faHeartSolid;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
      if (this.productService.products().length === 0) {
          this.productService.getProducts();
      }
  }

   onCategoryChange(event:Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.productService.setCategory(selectedCategory);
  }

  addToWishList(status:string,id:number) {
    const wishList = this.productService.wishListArray();
    const listObj:number[] = [...wishList];
    if(status == "add") {
      listObj.push(id);
    } else if(status == "remove") {
      listObj.splice(listObj.indexOf(id),1);
    }
    this.productService.wishListArray.set(listObj);
  }

  sortColumn(col:string) {
    console.log(col);
    this.sortColumDir[col] = !this.sortColumDir[col];
    let sortValue = 1
    this.productService.products().sort((a:any,b:any)=> {
      console.log(a[col]);
      
      sortValue =this.sortColumDir[col]? -1 : 1; 
      console.log(this.sortColumDir[col] , '', sortValue);
       // Handle numbers
    if (typeof a[col] === 'number' && typeof b[col] === 'number') {
      console.log("number");
      return (a[col] - b[col]) * sortValue;
    } else {
      a= a[col].toString().toLowerCase();
      b= b[col].toString().toLowerCase();
      console.log("string");
      return a.localeCompare(b)* sortValue; //handles string
    }
    });
  }

  updateCart(productId:number,index:number,sign:string) {
    this.cartService.addItems(productId,index,sign);
  }

  trackById(index:number,item:any):number {
    return item.id;
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
