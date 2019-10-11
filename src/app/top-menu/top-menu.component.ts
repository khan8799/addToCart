import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  appUser: AppUser;
  value = 'clear me';
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private router: Router,
    private shoppingCartServic: ShoppingCartService
  ) { }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCartServic.getCart().then(x => {
      x.subscribe(count => {
        this.shoppingCartItemCount = 0;
        if (count.items)
          this.shoppingCartItemCount = count.totalItemsCount;
      });
    }).catch(err => console.log(err));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
