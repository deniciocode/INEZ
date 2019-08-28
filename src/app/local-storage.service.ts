import { Injectable } from '@angular/core';
import { ShoppingItem } from './shopping-item';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private STORE_KEY = 'my-super-shopping-list';

  constructor() { }

  public restoreFromLocalStorage(): ShoppingItem[] {
    const stringyfied = localStorage.getItem(this.STORE_KEY);
    const shoppingList = JSON.parse(stringyfied) as ShoppingItem[];
    let restoredItems: ShoppingItem[] = [];
    for (const item of shoppingList) {
      const shoppingItem = ShoppingItem.fromObject(item);
      restoredItems.push(shoppingItem);
    }
    return restoredItems;
  }

  public storeItems(items: ShoppingItem[]): void {
    const stringyfied = JSON.stringify(items);
    localStorage.setItem(this.STORE_KEY, stringyfied);
  }
}
