import { Component, OnInit } from '@angular/core';
import { Patient } from '../interface/patient.interface'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { isNullOrUndefined } from 'util';
import { ExcelExportService } from '../services/user/excel-export.service';
import { EventService } from '../services/user/event.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.page.html',
  styleUrls: ['./reporting.page.scss'],
})
export class ReportingPage implements OnInit {

  patients:Array<any>=[];
  users:Array<any>=[];
  services:Array<any>=[];
  donations:Array<any>=[];
  reportName:string = "";
  from : any;
  to : any;
  keys:Array<any>=[];

  constructor(public excelService: ExcelExportService, public fireStore: AngularFirestore,
    public userService:UserService, public eventService: EventService) {

  }

  ngOnInit() {
    this.loadPatientData();
    this.loadServicesData();
    this.loadDonationsData();
    this.loadUserData();
  }

  loadUserData(){
    this.fireStore.collection<any>('users').valueChanges().subscribe(userList => {
      userList.forEach(user => {
        this.users.push(user);
      });
    });
}

  loadPatientData(){
      this.fireStore.collection<any>('patients').valueChanges().subscribe(patientList => {
        patientList.forEach(patient => {
          this.patients.push(patient);
        });
      });
  }

  loadServicesData(){
    this.fireStore.collection<any>('services').valueChanges().subscribe(servicesList => {
      servicesList.forEach(services => {
        this.services.push(services);
      });
    });
  }

  loadDonationsData(){
    this.fireStore.collection<any>('donations').valueChanges().subscribe(donationList => {
      donationList.forEach(donations => {
        this.donations.push(donations);
      });
    });
  }

  generateKeys(object):Array<any>{
    let keys = [];
    for(let key in object){
      keys.push(key);
    }
    return keys;
  }

  patientFilter(patientList:Array<any>):Array<any>{
    if(isNullOrUndefined(this.from) && isNullOrUndefined(this.to)){
      return patientList;
    }
    let list = [];
    list = patientList.filter(patient => {
      if(patient.Date_Of_Admission>=this.from && patient.Date_Of_Admission<=this.to){
        return patient;
      }
    });
    return list;
  }

  serviceFilter(serviceList:Array<any>):Array<any>{
    if(isNullOrUndefined(this.from) && isNullOrUndefined(this.to)){
      return serviceList;
    }
    let list = [];
    list = serviceList.filter(service => {
      if(service.Counselling_Date>=this.from && service.Counselling_Date<=this.to){
        return service;
      }
    });
    return list;
  }

  donationFilter(donationList:Array<any>):Array<any>{
    if(isNullOrUndefined(this.from) && isNullOrUndefined(this.to)){
      return donationList;
    }
    let list = [];
    list = donationList.filter(donation => {
      if(donation.Date_Of_Donation>=this.from && donation.Date_Of_Donation<=this.to){
        return donation;
      }
    });
    return list;
  }

  userFilter(userList:Array<any>):Array<any>{
    if(isNullOrUndefined(this.from) && isNullOrUndefined(this.to)){
      return userList;
    }
    let list = [];
    list = userList.filter(user => {
      if(this.eventService.dateInRange(user.Created_TimeStamp, this.from, this.to) == true)
        return user;
    });
    return list;
  }

  validateFormFailed(){

    if(this.reportName=="")
      return true;

    // if(this.from==""){
    //   if(this.to=="")
    //     return false;
    //   return true;
    // }
    // else{
    //   if(this.to=="")
    //     return true;
    //   return false;
    // }
    return isNullOrUndefined(this.from)?(isNullOrUndefined(this.to)?false:true):(isNullOrUndefined(this.to)?true:false);
  }

  download(){
    let list = [];
    let report:string = null;
    if(this.validateFormFailed()==false){
 
        if(this.reportName=="patients"){
          list = this.patientFilter(this.patients);
          if(list.length>0){
            this.keys = this.generateKeys(list[0]);
            report = "Patients";
          }
          else{
            this.userService.presentAlert("Warning","No data is available for patients in the selected date range");
            return;
          }
        }
        else if(this.reportName=="donations"){
          list = this.donationFilter(this.donations);
          if(list.length>0){
            this.keys = this.generateKeys(list[0]);
            report = "Donations"
          }
          else{
            this.userService.presentAlert("Warning","No data is available for donations in the selected date range");
            return;
          }
        }
        else if(this.reportName=="services") {
          list = this.serviceFilter(this.services);
          if(list.length>0){
            this.keys = this.generateKeys(list[0]);
            report = "PatientServices";
          }
          else{
            this.userService.presentAlert("Warning","No data is available for patient services in the selected date range");
            return;
          }
        }
        else{
          list = this.userFilter(this.users);
          if(list.length>0){
            this.keys = this.generateKeys(list[0]);
            report = "Users";
          }
          else{
            this.userService.presentAlert("Warning","No data is available for users in the selected date range");
            return;
          }

        }
        if(!isNullOrUndefined(report)){
          this.excelService.exportToExcel(list,report,this.keys);
        }
        else{
          this.userService.presentAlert('Error',"Please select the report for generation");
        }
      }
      else{
        this.userService.presentAlert('Error',"Please select the required field.");
      }
}
}
