import { Food } from 'src/app/food';
import {Product} from 'src/app/product';

export class ShoppingItem {
  private checked: boolean;
  private attachedProduct: Product;

  static fromObject(shoppingItemObject: Object): ShoppingItem {
    const food = Food.fromObject(shoppingItemObject['food']);
    const amount = shoppingItemObject['amount'];
    return new ShoppingItem(amount, food);
  }

  constructor(private amount: number, private food: Food) {
    this.checked = false;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getFoodId(): number {
    return this.food.getId();
  }

  public setChecked(checked: boolean): void {
    this.checked = checked;
  }

  public getChecked(): boolean {
    return this.checked;
  }

  public toString(): string {
    if (this.hasProductAttached()) {
      return `${this.amount} ${this.attachedProduct.toString()}`
    } else {
      return `${this.amount} ${this.food.toString()}`
    }
  }

  public onePlus() {
    this.amount++;
  }

  public oneMinus() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  public hasSameFood(otherItem: ShoppingItem): boolean {
    return this.getFoodDescription() === otherItem.getFoodDescription();
  }

  public attach(product: Product): void {
    this.attachedProduct = product;
  }

  public hasProductAttached(): boolean {
    return this.attachedProduct !== undefined;
  }

  private getFoodDescription(): string {
    return this.food.getDescription();
  }

  public concat(otherItem: ShoppingItem) {
    this.amount += otherItem.amount;
  }
}
