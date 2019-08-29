import { Injectable } from '@angular/core';
import {Food} from 'src/app/food';
import {Product} from 'src/app/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    new Product('Gut&Günstig', 'Deutsche Markenbutter 250g', 1.29, 1),
    new Product('Weihenstephan', 'Butter 250g', 2.29, 1),

    new Product('Gut&Günstig', 'H-Milch 1,5%', 0.71, 2),
    new Product('Gut&Günstig', 'H-Milch 3,5%', 0.71, 2),
    new Product('Gut&Günstig', 'Reine Buttermilch', 0.39, 2),
    new Product('Bio EDEKA', 'H-Vollmilch 3,8%', 0.95, 2),
    new Product('EDEKA', 'laktosefreie fettarme H-Milch 1,5%', 0.95, 2),

    new Product('EDEKA', 'Kartoffeln festkochend Deutschland 2,5kg', 2.79, 3),
    new Product('EDEKA', 'Kartoffeln mehligkochend Deutschland 2,5kg', 2.79, 3),
    new Product('Unsere Heimat', 'Kartoffeln festkochend Deutschland 2kg', 2.29, 3),
    new Product('Unsere Heimat', 'Kartoffeln mehligkochend Deutschland 2kg', 2.29, 3),

    new Product('Gut&Günstig', 'Roggen Brötchen 8ST 560g', 0.89, 5),
    new Product('Gut&Günstig', 'Frühstücks Bötchen 6ST 300g', 0.39, 5),
  ]

  constructor() { }

  public getProductsFor(foodId: number): Product[] {
    return this.products.filter(
      (product) => product.getFoodId() === foodId
    );
  }
}
