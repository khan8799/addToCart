import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment.prod';

import { AppComponent } from './app.component';

import { ProductsComponent } from './admin/products/products.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductFormComponent } from './admin/products/product-form/product-form.component';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './main-body/product/product.component';
import { CategoryComponent } from './main-body/category/category.component';
import { MainBodyComponent } from './main-body/main-body/main-body.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ProductQuantityComponent } from './main-body/product-quantity/product-quantity.component';
import { ShoppingCartComponent } from './main-body/shopping-cart/shopping-cart.component';
import { ReviewOrderComponent } from './main-body/shopping-cart/review-order/review-order.component';
import { ShippingFormComponent } from './main-body/shopping-cart/shipping-form/shipping-form.component';
import { CheckoutComponent } from './main-body/shopping-cart/checkout/checkout.component';

import { ProductService } from './services/product.service';
import { MenuService } from './services/menu.service';
import { SnackbarService } from './services/snackbar.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ColorService } from './services/color.service';
import { BrandService } from './services/brand.service';
import { ShoppingCartService } from './services/shopping-cart.service';

import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
  declarations: [
    AppComponent,

    ProductsComponent,
    ProductListComponent,
    ProductFormComponent,

    MainMenuComponent,
    TopMenuComponent,
    FooterComponent,
    ProductComponent,
    CategoryComponent,
    MainBodyComponent,
    ShoppingCartComponent,
    LoginComponent,
    SignupComponent,
    ProductQuantityComponent,
    ReviewOrderComponent,
    ShippingFormComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,

    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    NgxPayPalModule
  ],
  providers: [
    ProductService,
    MenuService,
    SnackbarService,
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    BrandService,
    ColorService,
    ShoppingCartService
  ],
  entryComponents: [
    SignupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
