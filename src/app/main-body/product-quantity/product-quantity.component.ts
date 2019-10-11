import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  quantity: number;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    let products = this.product;
    this.cartService.addToCart({ ...products });
  }

  removeFromCart() {
    let products = this.product;
    this.cartService.removeFromCart({ ...products });
  }

}
