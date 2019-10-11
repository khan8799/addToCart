import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  colorList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getcolorList() {
    this.colorList = this.db.list('color');

    return this.colorList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }))
      )
    );
  }
}
