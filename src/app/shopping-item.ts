import { Product } from 'src/app/product';

export class ShoppingItem {
  constructor(private amount: number, private product: Product) {}

  public getAmount(): number {
    return this.amount;
  }

  public toString(): string {
    return `${this.amount} ${this.product.toString()}`
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
