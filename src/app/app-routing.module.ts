import { ProductListComponent } from './admin/product-list/product-list.component';
import { MainBodyComponent } from './main-body/main-body/main-body.component';
import { ProductsComponent } from './admin/products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { SignupComponent } from './user/signup/signup.component';
import { ShoppingCartComponent } from './main-body/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainBodyComponent,
    data: { page: 'home' }
  },
  {
    path: 'admin/add-product',
    component: ProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
    data: { page: 'admin/add-product' }
  },
  {
    path: 'admin/product-list',
    component: ProductListComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { page: 'login' }
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    data: { page: 'sign-up' }
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuardService],
    data: { page: 'shopping-cart' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
