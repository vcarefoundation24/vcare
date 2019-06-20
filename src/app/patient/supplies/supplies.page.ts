import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.page.html',
  styleUrls: ['./supplies.page.scss'],
})
export class SuppliesPage implements OnInit {

  counsellor: string = ""
  patientUniqueId: string = ""
	fileNo: string = ""
	patientName: string = ""
  service: string = ""
  amount: number = null
  ickit: boolean = false
  icebox: boolean = false
  condifencebags: boolean = false
  braprosthesis: boolean = false
  wigs: boolean = false
  cdate: string = this.formatDate(new Date())
  comments: string = ""

  constructor(
		public afstore: AngularFirestore,
		public alertController: AlertController,
    public router: Router,
    public pservice: ProfileService) { 

      this.patientUniqueId = pservice.getCurrentPatientUniqueId();
      this.fileNo = pservice.getCurrentPatientFileNo();
      this.patientName = pservice.getCurrentPatientName();pservice.getUserProfile().get().then(user=>{
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
    this.ickit = false
    this.icebox = false
    this.condifencebags = false
    this.braprosthesis = false
    this.wigs = false
  }
  
  async addSupplies(){

    if(this.validateFields() == true){
      if(this.validateServices() == true){
          
        this.amount = 0;
        if(this.ickit)
        {
          this.service = "Infection Control Kit";
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
        }

        if(this.icebox)
        {
          this.service = "Ice Box for storing injections";
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
        }

        if(this.condifencebags)
        {
          this.service = "Confidence Bags";
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
        }

        if(this.braprosthesis)
        {
          this.service = "Bras and Prosthesis";
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
        }

        if(this.wigs)
        {
          this.service = "Wigs";
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
        }

        this.presentAlert('Success', 'Supplies added successfully!')
        this.resetFields();

      }
      else{
        this.presentAlert('Error','Please check atleast one supply.');
      }
  }
  else{
    this.presentAlert('Error','Please fill all the mandatory fields.');
  }

  }


validateServices(): boolean{

  if(this.ickit == false &&
      this.icebox == false &&
      this.condifencebags == false &&
      this.braprosthesis == false &&
      this.wigs == false)
        return false;
  return true;

}

validateFields(): boolean{

  if(this.counsellor == "" ||
    this.fileNo == "" ||
    this.patientName == null ||
    this.cdate == "" )
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