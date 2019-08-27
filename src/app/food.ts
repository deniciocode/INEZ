export class Food {
  constructor(
    private id: number,
    private describtion: string,
    private messurement: string,
    private synonyms: string[] = []
  ) {}

  public toString(): string {
    if (this.messurement === '' || this.messurement === undefined) {
      return this.describtion;
    }
    return `${this.messurement} ${this.describtion}`
  }

  static fromObject(productObject: Object): Food {
    return new Food(
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
