import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { PatientServicesPage } from '../patient-services/patient-services.page';

export interface Patient {
	name: string;
  age: string;
  fileNo: string;
  hospital: string;
  state: string;
  uniqueId: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  private patientCollection: AngularFirestoreCollection<Patient>;
  private patient: Array<Patient> = [];
  private patientName: string;
  private dataLoaded:boolean = false;
  public searchPatients: Array<Patient> = [];
  showLoader = true;

  public searchFileId:string ;
  public searchPatientName:string ;
  public searchHospital:string ;
  public filter:any = {};
  constructor(
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
    public router: Router,
    public navCtrl: NavController,
    public loadingController: LoadingController) {
       this.loadPatients();
    this.resetSearch();
   }

  ngOnInit() {
   
  }



async loadPatients() {
  
    this.searchPatients = [];
    this.patientCollection = this.afstore.collection<Patient>('patients');
      this.patientCollection.valueChanges().subscribe(patientList =>{
        this.patient = [];
        patientList.forEach(patientObject =>{
        this.patient.push(patientObject);
    });
    this.showLoader = false;
    this.searchPatients = this.patient;
  });
    
}  

resetSearch(){
 this.searchFileId = "";
 this.searchPatientName = "";
 this.searchHospital = "";
}

searchPatient(){
  this.searchPatients = [];
  this.filter = {};
  this.filter['File_Number']=this.searchFileId;
  this.filter['Name']=this.searchPatientName;
  this.filter['Hospital']=this.searchHospital;
  const keys = Object.keys(this.filter);
  this.searchPatients = this.patient.filter(object =>{
    return keys.every(item => {
      if(!this.filter[item].length){
        return true;item
      }
      return object[item].includes(this.filter[item]);
    });
  });
}

  toProfile(uniqueId){
    let navigationExtras: NavigationExtras = {
     queryParams: {
         uniqueId:  uniqueId
     }
 };
 this.navCtrl.navigateForward(['patientProfile'], navigationExtras);
 }

 toPatientServices(uniqueId, fileNo, name){
  let navigationExtras: NavigationExtras = {
   queryParams: {
       uniqueId:  uniqueId,
       fileNo: fileNo,
       name: name
   }
};
this.navCtrl.navigateForward(['patientServices'], navigationExtras);
}

toShowServices(uniqueId, fileNo, name){
  let navigationExtras: NavigationExtras = {
   queryParams: {
    uniqueId:  uniqueId,
    fileNo: fileNo,
    name: name
   }
};
this.navCtrl.navigateForward(['showServices'], navigationExtras);
}

}

