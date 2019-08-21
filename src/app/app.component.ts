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

  constructor(
    private fb: FormBuilder,
    private shoppingService: ShoppingItemService
  ) {}

  ngOnInit(): void {
    this.shoppingForm = this.fb.group({
      item: ['', Validators.required]
    });
    // this.shoppingForm.patchValue({item: 'Butter'})
    // this.addToCard();
    // this.shoppingForm.patchValue({item: 'Kartoffeln'})
    // this.addToCard();
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
  }

  private handleNewShoppingItem(shoppingItem: ShoppingItem): void {
    const index = this.shoppingList.findIndex((item) => {
      return item.hasSameProduct(shoppingItem);
    });
    if (index < 0) {
      this.shoppingList.push(shoppingItem);
    } else {
      this.shoppingList[index] = this.shoppingList[index].concat(shoppingItem);
    }
  }

  public deleteOnIndex(givenItem: ShoppingItem): void {
    // TODO we need a confirmation
    this.shoppingList = this.shoppingList.filter(
      shoppingItem => shoppingItem !== givenItem
    );
  }
}
