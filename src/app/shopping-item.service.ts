import { Injectable } from '@angular/core';
import { Food } from 'src/app/food';
import { ShoppingItem } from 'src/app/shopping-item';
import { stringSimilarity } from 'string-similarity-js';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {
  private STRING_MATCH_LIMIT = 0.2;

  private foodList: Food[] = [
    new Food(1, 'Butter', 'Stueck'),
    new Food(2, 'Milch', 'Liter'),
    new Food(3, 'Kartoffeln', 'Kg'),
    new Food(4, 'Karotten', 'Kg', [
      'Möhren'
    ]),
    new Food(5, 'Brötchen', '', [
      'Schrippe',
      'Brotchen',
      'Broetchen',
      'Semmel'
    ]),
  ];

  constructor() { }

  public findBy(userText: string): ShoppingItem {
    if (userText === '') {
      return null;
    }
    const amount = this.findAmountBy(userText);
    const food = this.findFoodBy(userText);
    if (amount && food) {
      return new ShoppingItem(amount, food);
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

  private findFoodBy(userText: string): Food {
    let highestMatch = 0;
    let tmpMatch: number;
    let foundFood: Food;
    for (const food of this.foodList) {
      tmpMatch = this.highestStringMatch(food, userText);
      if (tmpMatch > this.STRING_MATCH_LIMIT && highestMatch < tmpMatch) {
        highestMatch = tmpMatch;
        foundFood = food;
      }
      tmpMatch = 0;
    }
    return foundFood;
  }

  private highestStringMatch(food: Food, userText: string): number {
    let foodMatch = stringSimilarity(food.getDescription(), userText);
    let synonymMatch: number;
    for (const synonym of food.getSynonyms()) {
      synonymMatch = stringSimilarity(synonym, userText);
      if (foodMatch < synonymMatch) { foodMatch = synonymMatch; }
    }
    return foodMatch;
  }
}
