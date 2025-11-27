import { Component, inject, signal } from '@angular/core';
import { CartService } from '../services/cart-service';
import { ProductService } from '../product-service';
import { CommonModule, JsonPipe } from '@angular/common';
import { TruncatePipe } from '../truncate-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


interface product {
  id:number,
  title: string,
  description:string,
  price:number,
  category:string,
  quantity:number
}

@Component({
  selector: 'app-cart',
  imports: [TruncatePipe,CommonModule,FontAwesomeModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})

export class Cart {

  public selectedItems = signal<{[key:string]:string}>({});
  public cartService = inject(CartService);
  public productService = inject(ProductService);
  public selectedProduct = signal<{[key:number]:any}>({});
  public allProduct = signal<product[]>([]);
  public selectedProductArray :any[] = [];
  public grandTotal:number = 0;


  ngOnInit() {
    Object.entries(this.cartService.noOfItems()).forEach((item: any, index) => {
      const obj = this.productService.productMap().get(Number(item[0]));
      obj['quantity'] = item[1];
      this.selectedProductArray.push(obj);
      this.grandTotal = this.grandTotal + obj['quantity'] * obj['price'];
    });
  }

}
