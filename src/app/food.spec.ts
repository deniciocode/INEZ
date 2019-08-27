import { Food } from './food';

describe('Product', () => {
  let product: Food;
  let describtion = 'Milch';
  let messurement = 'Liter';

  beforeEach(() => {
    product = new Food(4, describtion, messurement);
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
