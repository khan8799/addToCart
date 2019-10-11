import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { UserInterface } from '../models/user';
import { AppUser } from '../models/app-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  signUpForm: FormGroup = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    gender: new FormControl('', Validators.required),
    city: new FormControl('')
  });

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  updateUser(userData: UserInterface, user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: userData.displayName,
      displayName: userData.displayName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      gender: userData.gender,
      city: userData.city,
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
