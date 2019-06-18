import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';

@Component({
  selector: 'app-counselling',
  templateUrl: './counselling.page.html',
  styleUrls: ['./counselling.page.scss'],
})
export class CounsellingPage implements OnInit {

  counsellor: string = ""
  patientUniqueId: string = ""
	fileNo: string = ""
	patientName: string = ""
  service: string = ""
  amount: number = null
  cdate: string = ""
  comments: string = ""

  constructor(
    private route: ActivatedRoute,
		public afstore: AngularFirestore,
		public alertController: AlertController,
    public router: Router,
    public pservice: ProfileService) { 

      this.patientUniqueId = pservice.getCurrentPatientUniqueId();
      this.fileNo = pservice.getCurrentPatientFileNo();
      this.patientName = pservice.getCurrentPatientName();
      pservice.getUserProfile().get().then(user=>{
        this.counsellor = user.data().Name;
      });

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

  async resetFields() {
    this.service = ""
    this.cdate = ""
    this.comments = ""
    this.amount = null
  }
  
  async addCounselling(){

    if(this.validateFields() == true){
        this.amount = 0;
        const { counsellor,patientUniqueId,patientName,service,amount,cdate,comments } = this
        this.afstore.doc(`services/${this.afstore.createId()}`).set({
          Counsellor: counsellor,
          Patient_Aadhar_PAN : patientUniqueId,
          Patient_Name : patientName,
          Service : service,
          Amount : amount,
          Counselling_Date : cdate,
          Comments : comments
        })
        this.presentAlert('Success', 'Counselling added successfully!')
        this.resetFields();

    }
    else{
      this.presentAlert('Error','Please fill all the mandatory fields.');
    }
    
  }

  validateFields(): boolean{

		if(this.counsellor == "" ||
			this.fileNo == "" ||
			this.patientName == null ||
			this.service == "" ||
			this.cdate == "" ||
			this.comments == "")
				return false;
		return true;
	  }

}
