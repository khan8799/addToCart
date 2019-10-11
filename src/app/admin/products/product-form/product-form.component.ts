import { Component, OnInit } from '@angular/core';

import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MenuService } from 'src/app/services/menu.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  categories: Observable<any>;
  bufferValue = 50;
  brands: Observable<any[]>;
  colors: Observable<any[]>;

  constructor(
    public productService: ProductService,
    private menuService: MenuService,
    private storage: AngularFireStorage,
    private snackBar: SnackbarService,
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit() {
    this.productService.getProductList();
    this.brands = this.brandService.getBrandList();
    this.colors = this.colorService.getcolorList();
    this.categories = this.menuService.getMenu();
  }

  onClear() {
    this.productService.form.reset();
  }

  onSubmit() {
    if (this.downloadURL) {
      this.downloadURL.subscribe(imageUrl => {
        this.productService.createProduct(this.productService.form.value, imageUrl);
        this.snackBar.openSnackBar('form submitted', 'accent-bg', 5000);
        this.onClear();
      });
    } else {
      this.snackBar.openSnackBar('please upload image first', 'primary-bg', 5000);
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'product/' + (Math.random().toString(36).substring(2));
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadProgress = task.percentageChanges();
    this.snackBar.openSnackBar('image uploading...', 'accent-bg', 6000);
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
      }))
      .subscribe();
  }
}
