import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database'
import { UserService } from '../user.service';
import { EventService } from '../services/user/event.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  patientLoaded:boolean;
  volunteersLoaded:boolean;
  donationsLoaded:boolean;
  totalDonationLoaded:boolean;
  private patientConnected;
  private volunteersConnected;
  private HospitalReached;
  private patientRegisteredThisWeek;
  private DonationMadeThisWeek;
  private TotalDonation;
  private patients:any;
  private volunteers:Array<any>;
  private donations:Array<any>;
  constructor(public profileService:ProfileService, public fireStore: AngularFirestore, public userService: UserService,public eventService: EventService,
    ) { }

  ngOnInit() {
    this.refresh();
  }

  getPatientsList(){
    this.fireStore.collection<any>('patients/').valueChanges().subscribe((patienList) => {
      this.patients = [];
      patienList.forEach(patient=> {
          this.patients.push(patient);
      });
      this.patientLoaded = true;
      this.patientConnected = this.patients.length;
      this.getPatientConnectedThisWeek(this.patients);
    });
  }

  getVolunteersList(){
    this.fireStore.collection<any>('users/').valueChanges().subscribe(volunteersList => {
      this.volunteers = [];
      volunteersList.forEach(volunteer => {
        this.volunteers.push(volunteer);
      });
      this.volunteersLoaded = true;
      this.getConnectedVolunteers(this.volunteers);
    });
  }

  getDonationList(){
    this.fireStore.collection<any>('donations/').valueChanges().subscribe(donationsList => {
      this.donations = [];
      donationsList.forEach(donation => {
        this.donations.push(donation);
      });
      
      this.getDonationForThisWeek(this.donations);
      this.donationsLoaded = true;
      this.getTotalDonation(this.donations);
      this.totalDonationLoaded = true;
    });
  }

  getDonationForThisWeek(donationList:Array<any>){
    this.DonationMadeThisWeek = 0;
    donationList.forEach(object => {
      if(this.eventService.getDateDifferenceinDays((new Date).toLocaleString(),object.Date_Of_Donation)<=7){
        this.DonationMadeThisWeek += parseFloat(object.Amount);
      }
    });
  }

  getTotalDonation(donationList:Array<any>){
    this.TotalDonation = 0;
    donationList.forEach(object => {
        this.TotalDonation += parseFloat(object.Amount);
    });
  }

  getPatientConnectedThisWeek(patientList:Array<any>){
    this.patientRegisteredThisWeek = 0;
    patientList.forEach(object => {
      if(this.eventService.getDateDifferenceinDays((new Date()).toLocaleString(),object.Created_TimeStamp)<=7){
        this.patientRegisteredThisWeek++;
      }
    });
  }

  getConnectedVolunteers(volunteerList:Array<any>){
    this.volunteersConnected = 0;
    volunteerList.forEach(object =>{
      if(object.User_Type =="Volunteer"){
        this.volunteersConnected++;
      }
    });
  }

  refresh(){
    this.patientLoaded = false;
    this.volunteersLoaded = false;
    this.donationsLoaded = false;
    this.totalDonationLoaded = false;
    this.getDonationList();
    this.getPatientsList();
    this.getVolunteersList();
  }

  
}
