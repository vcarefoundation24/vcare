import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-register',
	templateUrl: './donation.page.html',
	styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

	public arrayNationality: any[];
	public arrayIdTypes: any[];
	public arrayCurrency: any[];

	public selectedIdTypes: any[];
	public selectedId: any;
	public currencyVal: string = "";
	public nationalityVal: string = "";


	donationId: string = ""
	name: string = "" 
	date: string = ""
	phone: string = ""
	email: string = ""
	address: string = ""
	category: string = ""
	modeOfDonation: string = ""
	chkNumber: string = ""
	currency: string = ""
	amount: string = ""
	nationality: string = ""
	idType: string = ""
	idValue: string = ""
	CRE_TS: any
	comments: string = ""


	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
		public router: Router
	) {
		this.intitalizeNationalities();
		this.initializeIdTypes();
		this.initializeCurrency();
	}

	ngOnInit() {
	}

	intitalizeNationalities() {
		this.arrayNationality = [
			{ id: 1, name: 'Indian' },
			{ id: 2, name: 'Foreigner' }
		];
	}

	initializeIdTypes() {
		this.arrayIdTypes = [
			{ id: 1, name: 'PAN', national_id: 1, national: 'Indian' },
			{ id: 2, name: 'Driving License', national_id: 1, national: 'Indian' },
			{ id: 3, name: 'Aadhar', national_id: 1, national: 'Indian' },
			{ id: 4, name: 'Passport', national_id: 1, national: 'Indian' },
			{ id: 5, name: 'Social Security Number', national_id: 2, national: 'Foreigner' },
			{ id: 7, name: 'Passport', national_id: 2, national: 'Foreigner' },
		];
	}

	initializeCurrency() {
		this.arrayCurrency = [
			{ id: 1, curr: 'Indian Rupees', currCode: 'INR' } 
			// { id: 2, curr: 'American Dollar', currCode: 'USD' },
			// { id: 3, curr: 'Canadian Dollar', currCode: 'CAD' },
			// { id: 4, curr: 'Australian Dollar', currCode: 'AUD' },
			// { id: 5, curr: 'EURO', currCode: 'EUR' },
			// { id: 6, curr: 'British Pound Sterling', currCode: 'GBP' }
		]
	}

	reset(){
		this.name = "" 
		this.date = ""
		this.date = ""
		this.phone = ""
		this.email = ""
		this.address = ""
		this.category = ""
		this.modeOfDonation = ""
		this.chkNumber = ""
		this.currency = ""
		this.amount = ""
		this.nationality = ""
		this.idType = ""
		this.idValue = ""
		this.CRE_TS = null
		this.comments = ""

	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async saveDonation() {

		if(this.validateFields()){

			this.donationId = this.afstore.createId();
			this.CRE_TS = new Date().toLocaleString();
	
			const { donationId, name, date, phone, email, address, category, modeOfDonation, chkNumber, currency, amount, nationalityVal, idType, idValue, CRE_TS, comments } = this
			try {
				this.afstore.doc(`donations/${donationId}`).set({
					Name : name, 
					Date_Of_Donation : date, 
					Phone : phone, 
					Email : email, 
					Address : address, 
					Category : category, 
					Mode_Of_Donation : modeOfDonation, 
					Cheque_Number : chkNumber, 
					Currency : currency['currCode'], 
					Amount : amount, 
					Nationality : nationalityVal, 
					ID_Type : idType, 
					ID_Number : idValue,
					Created_TimeStamp : CRE_TS,
					Comments : comments
				})
	
				this.presentAlert('Success', 'Donation Saved!')
				this.reset();
				this.router.navigate(['/dashboard'])
	
			} catch (error) {
				this.presentAlert('Alert', error)
			}

		}
		else{
			this.presentAlert('Error', 'Please enter all the mandatory fields.');

		}
		
	}

	setIdType(national) {
		this.selectedIdTypes = this.arrayIdTypes.filter(idType => idType.national_id == national.id)
		this.nationalityVal = national.name;
	}


	validateFields(): boolean{

		if(this.modeOfDonation=="Cheque" && this.chkNumber == "")
			return false;

		if(this.selectedIdTypes && this.idType == "")
			return false;
		

		if(this.name == "" ||
			this.date == "" ||
			this.phone == null ||
			this.email == "" ||
			this.address == "" ||
			this.category == "" ||
			this.modeOfDonation == null ||
			this.currency == "" ||
			this.amount == "" ||
			this.nationality == "" ||
			this.idValue == "" ||
			this.comments == "")
				return false;
		return true;
	  }


}
