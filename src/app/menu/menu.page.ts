import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile.service';
import { Router, RouterEvent } from '@angular/router';
import { Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public user: string="";
  public access: string="";
  public selectedPath='';

  pages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'clipboard',
      role: 'VS'
    },
    {
      title: 'My Profile',
      url: '/myprofile',
      icon: 'person',
      role: 'VS'
    },
    {
      title: 'Patient Registration',
      url: '/registerPatient',
      icon: 'add-circle',
      role: 'VS'
    },
    {
      title: 'Search Patient',
      url: '/searchPatient',
      icon: 'search',
      role: 'VS'
    },
    {
      title: 'Donation',
      url: '/donation',
      icon: 'cash',
      role: 'VS'
    },
    {
      title: 'About VCare',
      url: '/about',
      icon: 'information-circle',
      role: 'VS'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'contact',
      role: 'VS'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out',
      role: 'VS'
    }
  ]

  constructor(public profileService: ProfileService,public router:Router,public events: Events,public afStore:AngularFirestore) { 
    this.router.events.subscribe((event:RouterEvent)=> {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
    
  }

  loadAccessBasedPage(){
    this.profileService.getUserProfile().get().then(userSnapshot =>{
      this.user = userSnapshot.data().Name;
      this.access = userSnapshot.data().User_Type;
      if(this.access == "Staff" || this.access == "Volunteer"){
        this.pages.forEach(p => p.role ="VS");
      }else{
        this.pages.forEach(p => p.role ="A");
      }
    });
  }

  ngOnInit() {
    this.loadAccessBasedPage();
  }

}
