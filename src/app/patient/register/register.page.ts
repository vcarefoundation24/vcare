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
  othercancer: string = "";
  incomelevel: string = "";
  stay: string = "";
  state: string = "";
  otherstate: string = "";
  hospitaltype: string = "";
  hospital: string = "";
  otherhospital: string = "";
	date: string = this.formatDate(new Date())
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
          const { name,fileNo,age,uniqueId,sex,cancer,othercancer,incomelevel,stay,state,otherstate,hospitaltype,hospital,otherhospital,date,ward,comments } = this;
          this.afstore.doc(`patients/${uniqueId}`).set({
            Name:name,
            File_Number : fileNo,
            Age: age,
            Aadhar_PAN: uniqueId,
            Gender: sex,
            Cancer_Type : cancer,
            Cancer_Type_Other : othercancer,
            Income_Level : incomelevel,
            Place_Of_Stay : stay,
            State : state,
            State_Other : otherstate,
            Hospital_Type : hospitaltype,
            Hospital : hospital,
            Hospital_Other : otherhospital,
            Date_Of_Admission : date,
            Ward : ward,
            Comments : comments,
            Created_TimeStamp : createdOn,
            Updated_TimeStamp : updatedOn
          }).then((response) => {
            //this.presentAlert('Success', 'Patient added successfully!')

            this.alertForServices(this.uniqueId, this.fileNo, this.name);
            this.reset();
          });
          
          //this.router.navigate(['/dashboard'])
        }
    });

    }
    else{
      this.loading.dismiss();
      this.presentAlert('Error','Please fill all the mandatory(*) fields.');
    }
    
    } 

    async alertForServices(uniqueId1, fileNo1, name1){
      const alert = await this.alertController.create({
        header: 'Patient Services',
        message: 'Patient added successfully. Have you provided services to this patient?',
        buttons: [
          {
            text: 'Yes',
            role: 'yes',
            handler: (blah) => {
              
              let navigationExtras: NavigationExtras = {
                queryParams: {
                    uniqueId:  uniqueId1,
                    fileNo: fileNo1,
                    name: name1
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

      if(this.cancer=='Other' && this.othercancer=="")
        return false;

      if(this.hospital=='Other' && this.otherhospital=="")
        return false;  

      if(this.state=='Other' && this.otherstate=="")
        return false;

      if(this.name == "" ||
          this.fileNo == "" ||
          this.age == null ||
          this.sex == "" ||
          this.cancer == "" ||
          this.state == "" ||
          this.hospital == "" ||
          this.date == "")
              return false;
      return true;
      
    }

   formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
}
