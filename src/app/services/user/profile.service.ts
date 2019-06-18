import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public Id: string;
  private patientUniqueId: string;
  private patientFileNo: string;
  private patientName: string;
  constructor() { 
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.currentUser = user;
        this.Id = user.uid;
        this.userProfile = firebase.firestore().doc('users/'+user.uid);
      }
    });
  }

  getCurrentPatientFileNo(): string {
    return this.patientFileNo;
  }

  setCurrentPatientFileNo(patientFileNo: string) {
    this.patientFileNo = patientFileNo;
  }

  getCurrentPatientUniqueId(): string {
    return this.patientUniqueId;
  }

  setCurrentPatientUniqueId(patientUniqueId: string) {
    this.patientUniqueId = patientUniqueId;
  }

  getCurrentPatientName(): string {
    return this.patientName;
  }

  setCurrentPatientName(patientName: string) {
    this.patientName = patientName;
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  updateProfile(hospital: string,otherhospital: string, contact: string,address: string, updatedOn: any): Promise<any>{
    return this.userProfile.update({Hospital : hospital, Hospital_Other : otherhospital, Phone : contact, Address : address, Updated_TimeStamp : updatedOn});
  }

  getUserName(): firebase.firestore.DocumentData {
    return firebase.firestore().doc('users/'+this.Id).get();
  }
}
