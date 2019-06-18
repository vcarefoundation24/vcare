import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { EventService } from '../services/user/event.service';
import { AuthService } from '../services/user/auth.service';
import { AngularFireModule } from '@angular/fire';
import firebaseConfig from '../firebase';
declare var require: any
let firebase = require("firebase");
//import { userInfo } from 'os';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	name: string = ""
	email: string = ""
	phone: number = null
	address: string = ""
	dob: string = ""
	gender: string = ""
	usertype: string = ""
	hospital: string = ""
	comments: string = ""
	public loading:HTMLIonLoadingElement;
	public arrayHospitalTypes: any[];

	app;
	constructor(public afAuth: AngularFireAuth,public afstore: AngularFirestore,public user: UserService,public alertController: AlertController,
		public router: Router,public eventService:EventService,public loadingCtrl: LoadingController, public authService: AuthService) { 

			this.arrayHospitalTypes = eventService.getHospitalTypeArray();
		}

	ngOnInit() {
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async register() {

		if(this.validateFields() == true){

			if(!this.app){
				this.app = firebase.initializeApp(firebaseConfig, "secondary");
			}

			let createdOn = this.eventService.getDateinTimeStamp(new Date());
			let updatedOn = createdOn;
			const {name,email,phone,address,dob,usertype,gender,hospital, comments} = this
			this.loading = await this.loadingCtrl.create();
			await this.loading.present();
			this.app.auth().createUserWithEmailAndPassword(email, phone.toString()).then((response)=> {
				this.afstore.doc('users/'+response.user.uid).set({
					Name : name,
					Email : email,
					Gender : gender,
					Phone : phone,
					Address : address,
					Date_Of_Birth : dob,
					Hospital : hospital,
					User_Type : usertype,
					Comments : comments,
					Created_TimeStamp : createdOn,
					Updated_TimeStamp : updatedOn
				});
				let message:string = null;
				if(usertype=="Tier 1"){
					message = "Staff " + name;
				}
				else{
					message = "Volunteer " + name;
				}
				response.user.sendEmailVerification().then(()=>{
					this.loading.dismiss().then(()=>{
						this.reset();
						this.user.presentAlert('Success', message + ' registered and verfication link is sent to ' + email);
					});
				},
				error => {
					this.loading.dismiss().then(()=>{
						this.user.presentAlert('Error',error.message);
					});
				});
				this.app.auth().signOut();
			},
			error => {
				this.loading.dismiss().then(()=>{
					this.user.presentAlert('Alert' , error)
				});
			});
		}
		else{
			this.presentAlert('Error','Please fill all the mandatory fields.');
		}		
	}

	validateFields(): boolean{

		if(this.name == "" ||
			this.email == "" ||
			this.phone == null ||
			this.address == "" ||
			this.dob == "" ||
			this.gender == "" ||
			this.usertype == "" ||
			this.hospital == "" ||
			this.comments == "")
				return false;
		return true;
		
	  }

	  reset(){

			this.name = "";
			this.email = "";
			this.phone = null;
			this.address = "";
			this.dob = "";
			this.gender = "";
			this.usertype = "";
			this.hospital = "";
			this.comments = "";		
	  }

}
