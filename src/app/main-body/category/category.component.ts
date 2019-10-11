import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  value = 0;
  max = 5000;
  min = 0;
  brands: Observable<any[]>;
  colors: Observable<any[]>;
  favoriteBrand = 'brand';
  favoriteColor = 'color';
  constructor(
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit() {
    this.brands = this.brandService.getBrandList();
    this.colors = this.colorService.getcolorList();
  }

}
