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

  public getDescription(): string {
    return this.describtion;
  }

  public getSynonyms(): string[] {
    return this.synonyms;
  }
}
