import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  showLoader:boolean = true;
  public loading: HTMLIonLoadingElement;

  constructor(public user:UserService, public router:Router, public authService: AuthService, public loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.logout();
  }

  async logout(){
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.authService.logoutUser().then(() => {
      this.loading.dismiss().then(()=>{
        this.router.navigate(['/login']);
      });
    },
    error => {
      this.loading.dismiss().then(() => {
        this.user.presentAlert("Error",error.message);
      })
    })
  }

}
