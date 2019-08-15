import { ShoppingItemService } from './shopping-item.service';
import {ShoppingItem} from 'src/app/shopping-item';

describe('ShoppingItemService', () => {
  let service: ShoppingItemService;
  beforeEach(() => {
    service = new ShoppingItemService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#findBy()', () => {
    let returnedItem: ShoppingItem;
    let inputString: string;

    describe('when input string is empty', () => {
      it('should return null', () => {
        inputString = '';
        returnedItem = service.findBy(inputString);
        expect(returnedItem).toBeNull();
      });
    });

    describe('when no number is given', () => {
      it('return an item with amount of one', () => {
        inputString = 'Milch';
        returnedItem = service.findBy(inputString);
        expect(returnedItem.toString()).toBe('1 Liter Milch');
      });
    });

    describe('when number is given in text', () => {
      it('returns the item with leading number', () => {
        inputString = '2 mal Butter';
        returnedItem = service.findBy(inputString);
        expect(returnedItem.toString()).toBe('2 Stueck Butter');
      });
    });

    describe('when user input has incorect spelling', () => {
      it('return the correct product', () => {
        inputString = '3 Buter';
        returnedItem = service.findBy(inputString);
        expect(returnedItem.toString()).toBe('3 Stueck Butter');
      });
    });
  });
});
