import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public name:string = "Admin";
  public userDoc: AngularFirestoreDocument<any>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private user: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
    public afstore: AngularFirestore,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    // this.getName();
  }

  // async getName() {
  //   this.userDoc = this.afstore.doc<any>('users/'+this.user.getUID());
  //   this.userDoc.valueChanges().subscribe(userObj => {
  //       this.name = userObj.name;
  //     });
  // }

  // checkSideMenu() {
  //   return this.user.isAuthenticated();
  // }
}
