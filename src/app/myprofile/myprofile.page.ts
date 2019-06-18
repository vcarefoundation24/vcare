import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {ProfileService} from '../services/user/profile.service'
import * as firebase from 'firebase/app';
import { EventService } from '../services/user/event.service';
import { LoadingController, Events } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  
  name: string = "";
	gender: string = "";
	usertype: string = "";
	address: string = "";
  hospital: string = "";
  dob: string = "";
  phone: string = "";
  email: string = "";
  isDisabled: boolean;
  public userProfile: firebase.firestore.DocumentReference;
  public profileData = {};
  public arrayHospitalTypes: any[];
  public loading:HTMLIonLoadingElement;



  constructor(public userService: UserService,public profileService: ProfileService, public eventService: EventService,
     public loadingCtrl: LoadingController,public route:ActivatedRoute,public events: Events) { 
    
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.isDisabled = true;
      this.loadProfile();
      this.userProfile = this.profileService.getUserProfile();
      this.arrayHospitalTypes = eventService.getHospitalTypeArray();
    });
  }

  ngOnInit() {
    // this.isDisabled = true;
    // this.loadProfile();
  }

  async loadProfile(){
    this.loading = await this.loadingCtrl.create();
		await this.loading.present();
    this.profileService.getUserProfile().get().then(userProfileSnapshot => {
      this.name = userProfileSnapshot.data().Name;
      this.gender = userProfileSnapshot.data().Gender;
      this.usertype = userProfileSnapshot.data().User_Type;
      this.address = userProfileSnapshot.data().Address;
      this.hospital = userProfileSnapshot.data().Hospital;
      this.dob = userProfileSnapshot.data().Date_Of_Birth;
      this.phone = userProfileSnapshot.data().Phone;
      this.email = userProfileSnapshot.data().Email;
      this.loading.dismiss();
    });
    this.events.subscribe('user:loggedIn1',(user,time)=>{
      this.events.publish('user:loggedIn2',user,time);
    });
  }

  editProfile() {
    this.isDisabled = false;
  }

  updateDetails() {
    if(this.validateFields() == true){
        let updatedOn = (new Date()).toLocaleString();
        this.profileService.updateProfile(this.hospital,this.phone,this.address, updatedOn).then(()=>{
        this.isDisabled = true;
        this.userService.presentAlert('Success', 'Profile updated successfully!');
      },
      error => {
        this.userService.presentAlert('Error',error.message);
      });  
    }
    else{
      this.userService.presentAlert('Error', 'Please enter all the mandatory fields.');
    }
    
  }

	validateFields(): boolean{

		if(this.hospital == "" ||
			this.address == "" ||
			this.phone == null)
				return false;
		return true;
		
	  }
}