import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit {
  brand: string;
  color: string;
  category: string;
  filter;
  products: any[] = [];
  filteredProducts: any[] = [];
  filteredBrand: any[] = [];
  filteredColor: any[] = [];
  filteredCategory: any[] = [];

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.populateProducts();
  }

  populateProducts() {
    this.productService.getProductList()
    .pipe(switchMap(products => {
      this.products = products;
      return this.activeRoute.queryParamMap;
    }))
    .subscribe(params => {
      this.brand = params.get('brand');
      this.color = params.get('color');
      this.category = params.get('category');

      let filterc = this.applyCategory(this.products);
      let filterco = this.applyColor(filterc);
      this.filteredProducts = this.applyBrand(filterco);
    });
  }

  applyCategory(filters) {
    return (this.category) ?
      filters.filter(p => (p.category === this.category)) :
      filters;
  }

  applyColor(filters) {
    return (this.color) ?
      filters.filter(p => (p.color === this.color)) :
      filters;
  }

  applyBrand(filters) {
    return (this.brand) ?
      filters.filter(p => (p.brand === this.brand)) :
      filters;
  }

}
