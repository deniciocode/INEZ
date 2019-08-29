import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {Food} from 'src/app/food';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  describe('#getProductsFor()', () => {
    it('return the product with the same id', () => {
      const foodId = 3;
      const foundProducts = service.getProductsFor(foodId);
      for (const foundProduct of foundProducts) {
        expect(foundProduct.getFoodId()).toEqual(foodId);
      }
    });

    describe('when no product has been found', () => {
      it('returns an empty array', () => {
        const nonsenseId = 3333333333333;
        const foundProducts = service.getProductsFor(nonsenseId);
        expect(foundProducts.length).toEqual(0);
      });
    })
  });
});
