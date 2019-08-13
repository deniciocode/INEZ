import { Product } from './product';

describe('Product', () => {
  let product: Product;
  let describtion = 'Milch';
  let messurement = 'Liter';

  beforeEach(() => {
    product = new Product(4, describtion, messurement);
  });

  it('should create an instance', () => {
    expect(product).toBeTruthy();
  });

  describe('#toString()', () => {
    it('returns messurement and describtion', () => {
      let result = product.toString();
      expect(result).toBe(`${messurement} ${describtion}`);
    });
  });
});
