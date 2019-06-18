import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Patient {
	name: string;
  fileNo: string;
}

@Component({
  selector: 'app-patient-services',
  templateUrl: './patient-services.page.html',
  styleUrls: ['./patient-services.page.scss'],
})
export class PatientServicesPage implements OnInit {

  uniqueId: string = ""
  fileNo: string = ""
  name: string = ""
  
  para : any
  private patientCollection: AngularFirestoreCollection<Patient>;
  private patient: Array<Patient> = [];

  constructor(private route: ActivatedRoute,public router: Router, public navCtrl: NavController,
    public pservice: ProfileService) {

    this.para = this.route.queryParams.subscribe(params => {
      this.uniqueId = params["uniqueId"];
      this.fileNo = params["fileNo"];
      this.name = params["name"];
    });
    
    pservice.setCurrentPatientUniqueId(this.uniqueId);
    pservice.setCurrentPatientFileNo(this.fileNo);
    pservice.setCurrentPatientName(this.name);
   }

  ngOnInit() {

    this.router.navigate(['patientServices/counselling']);
  }

}
