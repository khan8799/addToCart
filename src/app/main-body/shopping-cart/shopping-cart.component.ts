import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ShoppingCartComponent implements OnInit {
  carts: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService,
  ) { }

  async ngOnInit() {
    try {
      let cart$ = await this.shoppingCartService.getCart();
      cart$.subscribe(item => this.carts = item);
    } catch (err) {
      console.log(err);
    }
  }
}
