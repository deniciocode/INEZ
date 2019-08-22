import { Product } from 'src/app/product';

export class ShoppingItem {
  private checked: boolean;

  constructor(private amount: number, private product: Product) {
    this.checked = false;
  }

  static fromObject(shoppingItemObject: Object): ShoppingItem {
    let product = Product.fromObject(shoppingItemObject['product']);
    let amount = shoppingItemObject['amount'];
    return new ShoppingItem(amount, product);
  }

  public getAmount(): number {
    return this.amount;
  }

  public setChecked(checked: boolean): void {
    this.checked = checked;
  }

  public getChecked(): boolean {
    return this.checked;
  }

  public toString(): string {
    return `${this.amount} ${this.product.toString()}`
  }

  public onePlus() {
    console.log('Increasing Amount of -', this.getProductDescription())
    this.amount++;
  }

  public oneMinus() {
    console.log('Decreasing Amount of -', this.getProductDescription())
    if (this.amount > 0) {
      this.amount--;
    }
  }

  public hasSameProduct(otherItem: ShoppingItem): boolean {
    return this.getProductDescription() === otherItem.getProductDescription();
  }

  private getProductDescription(): string {
    return this.product.getDescription();
  }

  public concat(otherItem: ShoppingItem): ShoppingItem {
    const concatAmount = this.amount + otherItem.amount;
    return new ShoppingItem(concatAmount, this.product);
  }
}
