export class Product {
  constructor(
    private id: number,
    private describtion: string,
    private messurement: string,
    private synonyms: string[] = []
  ) {}

  public toString(): string {
    return `${this.messurement} ${this.describtion}`
  }

  static fromObject(productObject: Object): Product {
    return new Product(
      productObject['id'],
      productObject['describtion'],
      productObject['messurement'],
      productObject['synonyms']
    )
  }

  public getDescription(): string {
    return this.describtion;
  }

  public getSynonyms(): string[] {
    return this.synonyms;
  }
}
