import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface product {
  id:number,
  title: string,
  description:string,
  price:number,
  category:string
}


@Injectable({
  providedIn: 'root',
})


export class ProductService {
  private url ="https://dummyjson.com/products";
  private http = inject(HttpClient);
  public allProduct = signal<product[]>([]);
  public selectedCategory = signal<string>('All');
  public wishListArray = signal<number[]>([]);
  productMap = signal<Map<number, any>>(new Map());
  

  products = computed(() => {
    const allProducts = this.allProduct();
    const category = this.selectedCategory();
    const filteredData = allProducts.filter(item => item.category == category);
    return category == 'All' ? allProducts : filteredData;
  })

 
  getProducts() {
    this.http.get<{ products: product[] }>(this.url).subscribe((data)=> {
      const datas = data['products'];
      const map = new Map()
      for(let product of datas){
        map.set(product.id, product);
      }
      
      this.productMap.set(map);
      this.allProduct.set(datas);
    })
  }

  setCategory(cat:string) {
    this.selectedCategory.set(cat);
  }

  deleteProductById(id:number) {
    console.log(`$(this.url)/$(id)`);
    return this.http.delete(`$(this.url)/$(id)`);
  }
}
