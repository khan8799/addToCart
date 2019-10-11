import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private db: AngularFireDatabase) {}

  getMenu() {
    return this.db.list('menu/').valueChanges();
  }
}
