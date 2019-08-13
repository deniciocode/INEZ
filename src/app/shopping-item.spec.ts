import { ShoppingItem } from './shopping-item';
import { Product } from 'src/app/product';

describe('ShoppingItem', () => {
  let shoppingItem: ShoppingItem;
  let product: Product;

  beforeEach(() => {
    product = new Product(4, 'Kartoffeln', 'kg')
    shoppingItem = new ShoppingItem(2, product);
  });

  it('should create an instance', () => {
    expect(shoppingItem).toBeTruthy();
  });

  describe('.toString()', () => {
    it('should start with the amount', () => {
      expect(shoppingItem.toString()).toBe('2 kg Kartoffeln')
    });
  });
});
