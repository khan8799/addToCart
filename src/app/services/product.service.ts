import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    description: new FormControl(''),
    color: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.minLength(1)]),
    imageUrl: new FormControl(''),
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required)
  });

  intializeProductForm() {
    this.form.setValue({
      $key: null,
      name: '',
      displayName: '',
      description: '',
      color: '',
      price: '',
      imageUrl: '',
      category: '',
      brand: ''
    });
  }

  getProductList() {
    this.productList = this.db.list('product');

    // Use snapshotChanges().map() to store the key
    this.items = this.productList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.items;
  }

  createProduct(product, imageUrl: string) {
    this.productList.push({
      name: product.name,
      displayName: product.displayName,
      price: product.price,
      color: product.color,
      category: product.category,
      imageUrl: imageUrl,
      brand: product.brand
    });
  }

  updateProductList(product) {
    this.productList.update(product.$key,
      {
        name: product.name,
        displayName: product.displayName,
        price: product.price,
        color: product.color,
        imageUrl: product.imageUrl,
        category: product.category,
        brand: product.brand
      });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
