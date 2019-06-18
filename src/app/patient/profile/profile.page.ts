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
	state: string = ""
	hospital: string = ""
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
        this.state = patientObj.State;
        this.ward = patientObj.Ward;
        this.cancer = patientObj.Cancer_Type;
        this.incomelevel = patientObj.Income_Level;
        this.stay = patientObj.Place_Of_Stay;
        this.hospitaltype = patientObj.Hospital_Type;
        this.comments = patientObj.Comments;
      });

      this.arrayCancerTypes = eventService.getCancerTypeArray();
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
  
  async updatePatient(){

    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    if(this.validateFields()){

      
      let updatedOn = this.eventService.getDateinTimeStamp(new Date());
      const { fileNo,age,sex,cancer,incomelevel,stay,state,hospitaltype,hospital,ward,comments } = this
      this.afstore.doc(`patients/${this.uniqueId}`).update({
        File_Number: fileNo,
        Age : age,
        Gender : sex,
        Cancer_Type : cancer,
        Income_Level : incomelevel,
        Place_Of_Stay : stay,
        State : state,
        Hospital_Type : hospitaltype,
        Hospital : hospital,
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

  async deleteProfile(){
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Do you want to delete this patient\'s data?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: (blah) => {
            this.afstore.collection("patients").doc(this.fileNo).delete();
            this.router.navigate(['/searchPatient']);
          }
        }, {
          text: 'No'
        }
      ]
    });

    await alert.present();
  }

  validateFields(): boolean{

    if(this.fileNo == "" ||
      this.age == null ||
			this.sex == "" ||
			this.cancer == null ||
			this.state == "" ||
			this.hospital == "" ||
      this.ward == "" ||
      this.incomelevel == null ||
			this.stay == "" ||
      this.hospitaltype == "" ||
      this.comments == "")
				return false;
		return true;
	  }

}
