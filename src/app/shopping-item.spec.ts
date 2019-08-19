import { ShoppingItem } from './shopping-item';
import { Product } from 'src/app/product';

describe('ShoppingItem', () => {
  let shoppingItem: ShoppingItem;
  let product: Product;
  let product2: Product;
  const givenAmount = 2;

  beforeEach(() => {
    product = new Product(4, 'Kartoffeln', 'kg');
    product2 = new Product(1, 'Butter', 'kg');
    shoppingItem = new ShoppingItem(givenAmount, product);
  });

  it('should create an instance', () => {
    expect(shoppingItem).toBeTruthy();
  });

  describe('.toString()', () => {
    it('should start with the amount', () => {
      expect(shoppingItem.toString()).toBe('2 kg Kartoffeln')
    });
  });

  describe('#concat', () => {
    let otherShoppingItem: ShoppingItem;

    it('should return a ShoppingItem', () => {
      otherShoppingItem = new ShoppingItem(2, product)
      expect(shoppingItem.concat(otherShoppingItem))
        .toEqual(jasmine.any(ShoppingItem));
    });

    describe('when products are the same', () => {
      it('should concatinate the amount', () => {
        let newAmount = 3;
        let otherShoppingItem = new ShoppingItem(newAmount, product);
        const resultItem = shoppingItem.concat(otherShoppingItem);
        expect(resultItem.getAmount()).toEqual(newAmount + givenAmount)
      });
    });
  });

  describe('#hasSameProduct', () => {
    describe('when product is the same', () => {
      it('should return true', () => {
        const isSame = shoppingItem.hasSameProduct(shoppingItem);
        expect(isSame).toEqual(true);
      });
    });

    describe('when product differs', () => {
      it('should return false', () => {
        let otherShoppingItem = new ShoppingItem(2, product2);
        const isSame = shoppingItem.hasSameProduct(otherShoppingItem);
        expect(isSame).toEqual(false);
      });
    });
  });
});
