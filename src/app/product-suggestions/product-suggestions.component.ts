import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShoppingItem} from 'src/app/shopping-item';
import {ProductService} from 'src/app/product.service';
import {Product} from 'src/app/product';

@Component({
  selector: 'inez-product-suggestions',
  templateUrl: './product-suggestions.component.html',
  styleUrls: ['./product-suggestions.component.scss']
})
export class ProductSuggestionsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public shoppingItem: ShoppingItem,
    private dialogRef: MatDialogRef<ProductSuggestionsComponent>,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  public productSuggestions(): Product[] {
    const foodId = this.shoppingItem.getFoodId();
    return this.productService.getProductsFor(foodId);
  }

  public pick(product: Product): void {
    this.dialogRef.close(product);
  }
}
