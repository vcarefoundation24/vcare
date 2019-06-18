import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.page.html',
  styleUrls: ['./show-services.page.scss'],
})

export class ShowServicesPage implements OnInit {

 public serviceList;
 public patientServiceList;
 para: any;
 uniqueId: string = "";
 fileNo: string = "";
 name: string = "";
  constructor(
    private route: ActivatedRoute,
    public afstore: AngularFirestore,
		public alertController: AlertController,
    public router: Router,
  ) { 
    
    
    this.para = this.route.queryParams.subscribe(params => {
      this.uniqueId = params["uniqueId"];
      this.fileNo = params["fileNo"];
      this.name = params["name"];
    });
    this.serviceList = this.getServicesList().valueChanges();

    // this.serviceList.forEach(element => {   
    //   element.array.forEach(item => {
    //     if(item.fileNo == this.fileNo){
    //       this.patientServiceList.push(item);
    //     }
    //   });
      
    // });
  }

  ngOnInit() {
  } 

  getServicesList(): AngularFirestoreCollection<any> {
    return this.afstore.collection(`services`);
  }

}
