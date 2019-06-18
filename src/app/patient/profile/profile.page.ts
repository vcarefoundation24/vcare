import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { EventService } from 'src/app/services/user/event.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: string = ""
	age: number
	sex: string = ""
  cancer: string = ""
  othercancer: string = ""
  state: string = ""
  otherstate: string = ""
  hospital: string = ""
  otherhospital: string = ""
	ward: string = ""
  para : any
  fileNo: string = "";
  incomelevel: string = "";
  stay: string = "";
  hospitaltype: string = "";
  uniqueId: string = ""
  comments: string = ""
  isDisabled: boolean = true;
  private patientDoc: AngularFirestoreDocument<any>;
  patient: Observable<any>;
  public loading:HTMLIonLoadingElement;
  public arrayCancerTypes : any[];
  public arrayHospitalTypes: any[];
  public arrayStates: any[];
  

  constructor(private route: ActivatedRoute,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
    public router: Router,
    public eventService:EventService,
    public loadingCtrl: LoadingController) {

      this.para = this.route.queryParams.subscribe(params => {
        this.uniqueId = params["uniqueId"];
      });

      this.patientDoc = afs.doc<any>('patients/'+this.uniqueId);
      this.patient = this.patientDoc.valueChanges();
      this.patient.subscribe(patientObj => {
        this.fileNo = patientObj.File_Number;
        this.age = patientObj.Age;
        this.name = patientObj.Name;
        this.sex = patientObj.Gender;
        this.hospital = patientObj.Hospital;
        this.otherhospital = patientObj.Hospital_Other;
        this.state = patientObj.State;
        this.otherstate = patientObj.State_Other;
        this.ward = patientObj.Ward;
        this.cancer = patientObj.Cancer_Type;
        this.othercancer = patientObj.Cancer_Type_Other;
        this.incomelevel = patientObj.Income_Level;
        this.stay = patientObj.Place_Of_Stay;
        this.hospitaltype = patientObj.Hospital_Type;
        this.comments = patientObj.Comments;
      });

      this.arrayCancerTypes = eventService.getCancerTypeArray();
      this.arrayHospitalTypes = eventService.getHospitalTypeArray();
      this.arrayStates = eventService.getStateArray();
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
  
  async updatePatient(){

    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    if(this.validateFields()){

      if(this.cancer!='Other')
        this.othercancer = ''

      if(this.hospital!='Other')
        this.otherhospital = ''

      if(this.state!='Other')
        this.otherstate = ''

      let updatedOn = this.eventService.getDateinTimeStamp(new Date());
      const { fileNo,age,sex,cancer,othercancer,incomelevel,stay,state,otherstate,hospitaltype,hospital,otherhospital,ward,comments } = this
      this.afstore.doc(`patients/${this.uniqueId}`).update({
        File_Number: fileNo,
        Age : age,
        Gender : sex,
        Cancer_Type : cancer,
        Cancer_Type_Other : othercancer,
        Income_Level : incomelevel,
        Place_Of_Stay : stay,
        State : state,
        State_Other : otherstate,
        Hospital_Type : hospitaltype,
        Hospital : hospital,
        Hospital_Other : otherhospital,
        Ward : ward,
        Comments : comments
      }).then((response) =>{

        this.loading.dismiss();
        this.isDisabled = true;
        this.presentAlert('Success', 'Patient details updated successfully!')
      });
      
    }
    else{
      this.loading.dismiss();
      this.presentAlert('Error', 'Patient fields cannot be empty!')
    }
  }

  async resetPatient(){
    //same code

    this.presentAlert('Success', 'Patient details reset successfully!')
  }

  editProfile(){
    this.isDisabled = false;
  }

  // async deleteProfile(){
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Delete',
  //     message: 'Do you want to delete this patient\'s data?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         role: 'yes',
  //         handler: (blah) => {
  //           this.afstore.collection("patients").doc(this.fileNo).delete();
  //           this.router.navigate(['/searchPatient']);
  //         }
  //       }, {
  //         text: 'No'
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  validateFields(): boolean{

    if(this.cancer=='Other' && this.othercancer=="")
        return false;

      if(this.hospital=='Other' && this.otherhospital=="")
        return false;  

      if(this.state=='Other' && this.otherstate=="")
        return false;

    if(this.fileNo == "" ||
      this.age == null ||
			this.sex == "" ||
			this.cancer == null ||
			this.state == "" ||
			this.hospital == "")
				return false;
		return true;
	  }

}
