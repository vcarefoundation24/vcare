import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public USER_LOGGED : Observable<firebase.User>;
  public USER : firebase.User;
  
  constructor(public afAuth: AngularFireAuth) {
    this.USER_LOGGED = afAuth.authState;
    this.USER_LOGGED.subscribe( (user) => {
      if(user){
        this.USER = user;
      }
      else{
        this.USER = null;
      }
    });
   }

  loginUser(email: string,password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  resetPassword(email: string) : Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }

  registerUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }

}
