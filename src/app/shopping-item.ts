import {Product} from 'src/app/product';

export class ShoppingItem {
  constructor(private amount: number, private product: Product) {}

  public toString(): string {
    return `${this.amount} ${this.product.toString()}`
  }
}
