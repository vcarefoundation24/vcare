import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { EventService } from 'src/app/services/user/event.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = "";
	fileNo: string = "";
	age: number = null;
	sex: string = "";
  cancer: string = "";
  incomelevel: string = "";
  stay: string = "";
  state: string = "";
  hospitaltype: string = "";
  hospital: string = "";
	date: string = "";
  ward: string = "";
  comments: string = "";
  createDate: Date;
  updateDate: Date;
  uniqueId:string = "";
  arrayCancerTypes : any[];
  arrayHospitalTypes: any[];
  arrayStates: any[];
  public loading:HTMLIonLoadingElement;
  
  
  
  constructor(
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    public eventService:EventService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) { 
    this.arrayCancerTypes = eventService.getCancerTypeArray();
    this.arrayHospitalTypes = eventService.getHospitalTypeArray();
    this.arrayStates = eventService.getStateArray();
  
  }

  ngOnInit() {
  }
  
  reset(){
    this.name = "";
    this.fileNo = "";
    this.age = null;
    this.sex = ""
    this.cancer = "";
    this.incomelevel = "";
    this.stay = "";
    this.state = "";
    this.hospitaltype = "";
    this.hospital = "";
    this.date = "";
    this.ward = "";
    this.createDate = null;
    this.updateDate = null;
    this.uniqueId = "";
    this.comments = "";
  }
  
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

  async addPatient(){

    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    
    if(this.validateFields() == true){
      this.afstore.doc(`patients/${this.uniqueId}`).get().subscribe(snap => {
        if (snap.exists)
        {
          this.loading.dismiss();
          this.presentAlert('Error','Patient already exists with this PAN/AADHAR.');
        }
        else
        {
          this.loading.dismiss();
          let createdOn = this.eventService.getDateinTimeStamp(new Date());
			    let updatedOn = createdOn;
          const { name,fileNo,age,uniqueId,sex,cancer,incomelevel,stay,state,hospitaltype,hospital,date,ward,comments } = this;
          this.afstore.doc(`patients/${uniqueId}`).set({
            Name:name,
            File_Number : fileNo,
            Age: age,
            Aadhar_PAN: uniqueId,
            Gender: sex,
            Cancer_Type : cancer,
            Income_Level : incomelevel,
            Place_Of_Stay : stay,
            State : state,
            Hospital_Type : hospitaltype,
            Hospital : hospital,
            Date_Of_Admission : date,
            Ward : ward,
            Comments : comments,
            Created_TimeStamp : createdOn,
            Updated_TimeStamp : updatedOn
          }).then((response) => {
            this.presentAlert('Success', 'Patient added successfully!')
            this.alertForServices();
            this.reset();
          });
          
          //this.router.navigate(['/dashboard'])
        }
    });

    }
    else{
      this.loading.dismiss();
      this.presentAlert('Error','Please fill all the mandatory fields.');
    }
    
    } 

    async alertForServices(){
      const alert = await this.alertController.create({
        header: 'Patient Services',
        message: 'Have you provided services to this patient?',
        buttons: [
          {
            text: 'Yes',
            role: 'yes',
            handler: (blah) => {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                    uniqueId:  this.uniqueId,
                    fileNo: this.fileNo,
                    name: this.name
                }
             };
             this.reset();
             this.navCtrl.navigateForward(['patientServices'], navigationExtras);
            }
          }, {
            text: 'No'
          }
        ]
      });
  
      await alert.present();
    }

    validateFields(): boolean{
      if(this.name == "" ||
          this.fileNo == "" ||
          this.age == null ||
          this.sex == "" ||
          this.cancer == "" ||
          this.incomelevel == "" ||
          this.stay == "" ||
          this.state == "" ||
          this.hospitaltype == "" ||
          this.hospital == "" ||
          this.date == "" ||
          this.ward  == "" ||
          this.comments == "")
              return false;
      return true;
      
    }
   
}
