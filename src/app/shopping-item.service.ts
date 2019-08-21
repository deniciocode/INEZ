import { Injectable } from '@angular/core';
import { Product } from 'src/app/product';
import { ShoppingItem } from 'src/app/shopping-item';
import { stringSimilarity } from 'string-similarity-js';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {
  private STRING_MATCH_LIMIT = 0.2;

  private productList: Product[] = [
    new Product(1, 'Butter', 'Stueck'),
    new Product(2, 'Milch', 'Liter'),
    new Product(3, 'Kartoffeln', 'Kg'),
    new Product(4, 'Karotten', 'Kg', [
      'Möhren'
    ]),
    new Product(4, 'Brötchen', '', [
      'Schrippe',
      'Semmel'
    ]),
    new Product(4, 'Brot', '', [
      'Stulle'
    ])
  ];

  constructor() { }

  public findBy(userText: string): ShoppingItem {
    if (userText === '') {
      return null;
    }
    const amount = this.findAmountBy(userText);
    const product = this.findProductBy(userText);
    if (amount && product) {
      return new ShoppingItem(amount, product);
    } else {
      return null;
    }
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
    let highestMatch = 0;
    let tmpMatch: number;
    let productToReturn: Product;
    for (const product of this.productList) {
      tmpMatch = this.highestStringMatch(product, userText)
      if (tmpMatch > this.STRING_MATCH_LIMIT && highestMatch < tmpMatch) {
        highestMatch = tmpMatch;
        productToReturn = product;
      }
      tmpMatch = 0;
    }
    return productToReturn;
  }

  private highestStringMatch(product: Product, userText: string): number {
    let productMatch = stringSimilarity(product.getDescription(), userText);
    let synonymMatch: number;
    for (const synonym of product.getSynonyms()) {
      synonymMatch = stringSimilarity(synonym, userText);
      if (productMatch < synonymMatch) { productMatch = synonymMatch; }
    }
    return productMatch;
  }
}
