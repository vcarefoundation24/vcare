import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

   popover: any;
   public name:string ;

  constructor(public router: Router,public afAuth: AngularFireAuth,public afstore: AngularFirestore,
    public user: UserService) {

   }

  ngOnInit() {
    this.router.navigate(['/dashboard/statistics']);
  }


}
