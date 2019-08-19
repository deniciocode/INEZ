import { Injectable } from '@angular/core';
import { Product } from 'src/app/product';
import { ShoppingItem } from 'src/app/shopping-item';
import { stringSimilarity } from 'string-similarity-js';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {
  private productList: Product[] = [
    new Product(1, 'Butter', 'Stueck'),
    new Product(2, 'Milch', 'Liter'),
    new Product(3, 'Kartoffeln', 'Kg')
  ];

  constructor() { }

  public findBy(userText: string): ShoppingItem {
    if (userText === '') {
      return null;
    }
    const amount = this.findAmountBy(userText);
    const product = this.findProductBy(userText);
    return new ShoppingItem(amount, product);
  }

  private findAmountBy(userText: string): number {
    const numberArray = userText.match(/[+-]?\d+(?:\.\d+)?/g);
    if (numberArray) {
      return numberArray.map(Number)[0];
    } else {
      return 1;
    }
  }

  private findProductBy(userText: string): Product {
    // TODO
    // - synonyms
    let highestMatch = 0;
    let tmpMatch: number;
    let productToReturn: Product;
    for (const product of this.productList) {
      tmpMatch = stringSimilarity(product.getDescription(), userText);
      if (highestMatch < tmpMatch) {
        highestMatch = tmpMatch;
        productToReturn = product;
      }
      tmpMatch = 0;
    }
    return productToReturn;
  }
}
