import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent {
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private snackBar: SnackbarService
  ) { }

  clearCart() {
    this.shoppingCartService.clearCart();
    this.snackBar.openSnackBar('OOPS!!! You have removed all the items', 'warn-bg', 5000);
  }

}
