import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatListModule,
        MatIconModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // TODO localStorage should be removed or the logic for the shopping card
    // should be extracted
    // it is hard to test
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('.addToCard()', () => {
    describe('when item is new', () => {
      it('should add a new entry', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.debugElement.componentInstance;
        component.ngOnInit();

        expect(component.shoppingList.length).toBe(0);
        component.shoppingForm.patchValue({item: '1 Butter'});
        expect(component.addToCard());
        expect(component.shoppingList.length).toBe(1);
      });
    });

    describe('when item already existis', () => {
      it('sums the amount', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.debugElement.componentInstance;
        component.ngOnInit();
        expect(component.shoppingList.length).toBe(0);
        component.shoppingForm.patchValue({item: '1 Butter'});
        expect(component.addToCard());
        expect(component.shoppingList.length).toBe(1);
        component.shoppingForm.patchValue({item: '1 Butter'});
        expect(component.addToCard());
        expect(component.shoppingList.length).toBe(1);
      });
    });
  });
});
