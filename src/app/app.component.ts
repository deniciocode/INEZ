import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingItemService } from 'src/app/shopping-item.service';
import { ShoppingItem } from 'src/app/shopping-item';
import {
  DeleteConfirmationComponent
} from 'src/app/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

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
    private shoppingService: ShoppingItemService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.shoppingForm = this.fb.group({
      item: ['', Validators.required]
    });
    if (localStorage.length > 0) {
      this.restoreFromLocalStorage();
    }
  }

  private restoreFromLocalStorage(): void {
    const stringyfied = localStorage.getItem(this.STORE_KEY);
    const shoppingList = JSON.parse(stringyfied) as ShoppingItem[];
    for (const item of shoppingList) {
      const shoppingItem = ShoppingItem.fromObject(item);
      this.shoppingList.push(shoppingItem);
    }
  }

  public storeItems(): void {
    const stringyfied = JSON.stringify(this.shoppingList);
    localStorage.setItem(this.STORE_KEY, stringyfied);
  }

  public addToCard(): void {
    const userText: string  = this.shoppingForm.get('item').value;
    this.shoppingForm.reset();
    if (userText) {
      const shoppingItem = this.shoppingService.findBy(userText);
      if (shoppingItem) {
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
      return item.hasSameFood(shoppingItem);
    });
  }

  public deleteItem(givenItem: ShoppingItem): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(shouldBeDeleted => {
      if (shouldBeDeleted) {
        this.shoppingList = this.shoppingList.filter(
          shoppingItem => shoppingItem !== givenItem
        );
      }
      this.storeItems();
    });
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
