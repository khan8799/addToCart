import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { UserInterface } from '../models/user';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
      this.user$ = this.afAuth.authState;
  }

  private setReturnUrl() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // get current url from urlBar
    localStorage.setItem('returnUrl', returnUrl);
  }

  socialLogin(loginMethod: string) {
    this.setReturnUrl();
    if (loginMethod === 'google')
      return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    else if (loginMethod === 'facebook')
      return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    else if (loginMethod === 'twitter')
      return  this.afAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
  }

  emailLogin(user) {
    this.setReturnUrl();
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  emailSignup(user) {
    this.setReturnUrl();
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user)
            return this.userService.get(user.uid).valueChanges();
          else
            return of(null);
        })
      );
  }
}
