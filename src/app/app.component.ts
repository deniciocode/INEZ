import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingItemService } from 'src/app/shopping-item.service';
import { ShoppingItem } from 'src/app/shopping-item';

@Component({
  selector: 'inez-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingForm: FormGroup;
  shoppingList: ShoppingItem[] = [];
  private STORE_KEY = 'my-super-shopping-list';

  constructor(
    private fb: FormBuilder,
    private shoppingService: ShoppingItemService
  ) {}

  // TODO detect changes and show the save button
  ngOnInit(): void {
    this.shoppingForm = this.fb.group({
      item: ['', Validators.required]
    });
    if (localStorage.length > 0) {
      const stringyfied = localStorage.getItem(this.STORE_KEY);
      const shoppingList = JSON.parse(stringyfied) as ShoppingItem[];
      for (const item of shoppingList) {
        const shoppingItem = ShoppingItem.fromObject(item);
        this.shoppingList.push(shoppingItem);
      }
    }
  }

  storeItems(): void {
    console.log('Storing Items');
    if (this.shoppingList.length > 0) {
      const stringyfied = JSON.stringify(this.shoppingList);
      localStorage.setItem(this.STORE_KEY, stringyfied);
      console.log('We have items to store');
    }
  }

  addToCard(): void {
    const userText: string  = this.shoppingForm.get('item').value;
    this.shoppingForm.reset();
    if (userText) {
      const shoppingItem = this.shoppingService.findBy(userText);
      if (shoppingItem) {
        console.log('I found something with:', userText);
        console.log('The Item is:', shoppingItem);
        this.handleNewShoppingItem(shoppingItem);
      }
    }
    this.storeItems();
  }

  private handleNewShoppingItem(shoppingItem: ShoppingItem): void {
    const index = this.indexFor(shoppingItem);
    if (index < 0) {
      this.shoppingList.push(shoppingItem);
    } else {
      this.shoppingList[index] = this.shoppingList[index].concat(shoppingItem);
    }
  }

  private indexFor(shoppingItem: ShoppingItem): number {
    return this.shoppingList.findIndex((item) => {
      return item.hasSameProduct(shoppingItem);
    });
  }

  public deleteItem(givenItem: ShoppingItem): void {
    // TODO we need a confirmation
    this.shoppingList = this.shoppingList.filter(
      shoppingItem => shoppingItem !== givenItem
    );
    this.storeItems();
  }

  public increaseAmount(item: ShoppingItem): void {
    item.onePlus();
    this.storeItems();
  }

  public decreaseAmount(item: ShoppingItem): void {
    item.oneMinus();
    this.storeItems();
  }
}
