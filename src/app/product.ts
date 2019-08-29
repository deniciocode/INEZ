export class Product {
  constructor(
    private brandName: string,
    private description: string,
    private price: number,
    private foodId: number) {}

  public getFoodId(): number {
    return this.foodId;
  }

  public toString(): string {
    return `${this.brandName} ${this.description}`
  }
}
