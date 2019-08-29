export class Food {
  static fromObject(productObject: Object): Food {
    return new Food(
      productObject['id'],
      productObject['describtion'],
      productObject['messurement'],
      productObject['synonyms']
    )
  }

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

  public getDescription(): string {
    return this.describtion;
  }

  public getId(): number {
    return this.id;
  }

  public getSynonyms(): string[] {
    return this.synonyms;
  }
}
