import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input('product') product;

  constructor(
    private cartService: ShoppingCartService,
    private snackBar: SnackbarService,
  ) { }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.snackBar.openSnackBar('item added', 'accent-bg', 5000);
  }

}
