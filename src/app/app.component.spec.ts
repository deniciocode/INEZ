import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatListModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatListModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('.addToCard()', () => {
    it('should add the item given from the service', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      // app.ngOnInit();
      // expect(app.shoppingList.length).toBe(0);
      // app.addToCard();
      // expect(app.shoppingList.length).toBe(1);
    });
  });
});
