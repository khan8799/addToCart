import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  brandList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getBrandList() {
    this.brandList = this.db.list('brand');

    // Use snapshotChanges().map() to store the key
    return this.brandList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }))
      )
    );
  }

}
