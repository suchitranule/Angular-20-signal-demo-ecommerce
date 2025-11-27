import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  public noOfItems = signal<{ [key: number]: number }>({});
  public hideButtons = signal<{ [key: number]: boolean }>({});


  addItems(productId: number, index: number, sign:string) {
    const items = this.noOfItems();
    const updated = { ...items };
    updated[productId] = sign === "plus" ? (updated[productId] || 0) + 1 : (updated[productId] || 0) - 1;
    this.noOfItems.set(updated);

    const buttons = this.hideButtons();
    const updatedButtons ={...buttons};
    updatedButtons[productId] = updated[productId] > 0 ? true : false;
    this.hideButtons.set(updatedButtons);

    console.log(this.noOfItems());
    console.log(this.hideButtons());
  }

  cart = computed(() => {
    let carts = this.noOfItems();
    console.log("cart computed" + this.noOfItems() +"," + this.hideButtons())
    return Object.values(carts).reduce((acc, cur) => acc + cur, 0);
  })

  public selectedCartItem() {
    return this.noOfItems;
  }

}
