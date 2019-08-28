import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingItemService } from 'src/app/shopping-item.service';
import { ShoppingItem } from 'src/app/shopping-item';
import {
  DeleteConfirmationComponent
} from 'src/app/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import {LocalStorageService} from 'src/app/local-storage.service';

@Component({
  selector: 'inez-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingForm: FormGroup;
  shoppingList: ShoppingItem[] = [];

  constructor(
    private fb: FormBuilder,
    private shoppingService: ShoppingItemService,
    private dialog: MatDialog,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.shoppingForm = this.fb.group({
      item: ['', Validators.required]
    });
    if (localStorage.length > 0) {
      this.shoppingList = this.storageService.restoreFromLocalStorage();
    }
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
    this.storageService.storeItems(this.shoppingList);
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
      this.storageService.storeItems(this.shoppingList);
    });
  }

  public increaseAmount(item: ShoppingItem): void {
    item.onePlus();
    this.storageService.storeItems(this.shoppingList);
  }

  public decreaseAmount(item: ShoppingItem): void {
    item.oneMinus();
    this.storageService.storeItems(this.shoppingList);
  }
}
