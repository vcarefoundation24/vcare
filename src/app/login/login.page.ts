import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalController, Events } from '@ionic/angular';
import { ForgotPasswordPage } from '../modals/forgot-password/forgot-password.page';
import {AuthService} from '../services/user/auth.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	username:string = ""
	email: string = ""
	password: string = ""
	public loading:HTMLIonLoadingElement;
	constructor(public afAuth: AngularFireAuth, public user: UserService, public router: Router,public alertController: AlertController,
		public modalController: ModalController,public loadingCtrl: LoadingController, public authService: AuthService,
		public events: Events) { 
		}

	ngOnInit() {
		// if(firebase.auth().currentUser)
		// 	this.router.navigate(['/myprofile']);
		if(this.authService.USER_LOGGED)
			this.router.navigate(['/myprofile']);			
		this.reset();
	}

	async resetPassword() {
		const modal = await this.modalController.create({
			component: ForgotPasswordPage
		});
	 return await modal.present();
	  }

	reset(){
		this.email = "";
		this.password = "";
	}

	validateCredential(email: string, password:string) :boolean{
		return email!=undefined && email!==null && email!=="" && password!=undefined && password!==null && password!=="";
	}

	async login() {
		if(!this.validateCredential(this.email,this.password)){
			this.user.presentAlert('Error','Please provide the correct information');
			return;
		}else{
			const {email, password } = this
			this.loading = await this.loadingCtrl.create();
			await this.loading.present();
			try {
				
				this.authService.loginUser(email,password).then((result) => {
					if(result.user.emailVerified==true){
						this.loading.dismiss().then(()=>{
							this.events.publish('user:loggedIn1',result.user,Date.now());
							this.reset();
							this.router.navigate(['/myprofile']);
						});
					}
					else{
						this.loading.dismiss().then(()=>{
							this.user.presentAlert('Alert','Your Email Verfication is Pending!');
						});
					}
				},
				error => {
					this.loading.dismiss().then(async () => {
						this.user.presentAlert("Error",error.message);
					});
				});
			
			} catch(err) {
				if(err.code === "auth/user-not-found") {
					this.user.presentAlert("Alert","Wrong combination of email and password");
					this.reset();
				}
			}
		}
	}

}
