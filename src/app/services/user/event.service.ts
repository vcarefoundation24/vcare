import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private arrayCancerTypes : any[];
  private arrayHospitalTypes: any[];
  private arrayStates: any[];

  constructor() { 

    this.arrayCancerTypes = [
      { cancer: 'Liver Cancer' },
      { cancer: 'Lung Cancer' },
      { cancer: 'Renal Cancer' },
      { cancer: 'Breast Cancer' },
      { cancer: 'Colon Cancer' },
      { cancer: 'Stomach and Gastroesophagel Cancer' },
      { cancer: 'Retroperitoneal Sarcoma' }, 
      { cancer: 'Ovarian Cancer' },
      { cancer: 'Cervical Cancer' },
      { cancer: 'Endometrial Cancer' },
      { cancer: 'Epithelial Ovarian Cancer' },
      { cancer: 'Germ Cell Tumour' },
      { cancer: 'Vuccal Mucosa Cancer' },
      { cancer: 'Floor of mouth Cancer' },
      { cancer: 'Gingiva Cancer' },
      { cancer: 'Heart Palate Cancer' }, 
      { cancer: 'Hypopharyngeal Cancer' },
      { cancer: 'Laryngeal Cancer' },
      { cancer: 'Lip Cancer' },
      { cancer: 'Nasopharynx Cancer' },
      { cancer: 'Oral Cancer General Principles' },
      { cancer: 'Oral Toungue Cancer' },
      { cancer: 'Retromolar Trigone Cancer' },
      { cancer: 'Brain Tumour' },
      { cancer: 'Hodgkin Lymphoma' }, 
      { cancer: 'Non Hodgkin Lymphoma' },
      { cancer: 'Relapsed Lymphoma' },
      { cancer: 'Esophaegal Cancer' },
      { cancer: 'GIST-Gastrointestinal Stromal Tumour' },
      { cancer: 'STS' },
      { cancer: 'Osteosarcoma' }, 
      { cancer: 'Extremity Soft Tissue Sarcoma' },
      { cancer: 'Ewing\'s Carcoma' },
      { cancer: 'Chondrosarcoma' },
      { cancer: 'AML' },



      { cancer: 'ALL' },
      { cancer: 'Blood Cancer' },
      { cancer: 'CML' },

      { cancer: 'Bone & Soft Tissue' },
      { cancer: 'Head & Neck Cancer' },
      { cancer: 'Metastatic Renal Cell Carcinoma--mRCC' },

      { cancer: 'Kidney Cancer' },
      { cancer: 'Non-Small Cell Lung Cancer - NSCLC' },
      { cancer: 'Pancreatic Cancer' },

      { cancer: 'Uterus Cancer' },
      { cancer: 'Gynaecological Cancer' },
      { cancer: 'Bladder Cancer' },

      { cancer: 'Prostate Cancer' },
      { cancer: 'Bone Cancer' },
      { cancer: 'Childhood Cancer' },

      { cancer: 'Eye Cancer/Retinoblastoma' },
      { cancer: 'CLL' },
      { cancer: 'Multiple Myeloma' },

      { cancer: 'Melanoma' },
      { cancer: 'Thyroid Cancer' },
      { cancer: 'Vaginal Cancer' },

      { cancer: 'Testicular Cancer' },
      { cancer: 'Thoracic Cancer' },
      { cancer: 'Colorectal Cancer' }

    ]
    
    this.arrayHospitalTypes = [
      { hospital: 'Tata Memorial Hospital' }, 
      { hospital: 'Breach Candy Hospital' }, 
      { hospital: 'Nanavati Hospital' }, 
      { hospital: 'Apollo Hospital' }, 
      { hospital: 'ACTREC Hospital' }, 
      { hospital: 'Lilavati Hospital' }, 
      { hospital: 'Jaslok Hospital' }	
    ]
    
    this.arrayStates = [
      { state: 'Andhra Pradesh' },
      { state: 'Arunachal Pradesh' },
      { state: 'Jammu & Kashmir' },
      { state: 'Himanchal Pradesh' },
      { state: 'Sikkim' }, 
      { state: 'Manipur' },
      { state: 'Assam' },
      { state: 'Meghalaya' },
      { state: 'Madhya Pradesh' },
      { state: 'Gujarat' },
      { state: 'Rajasthan' }, 
      { state: 'Maharashtra' },
      { state: 'Goa' },
      { state: 'Kerala' },
      { state: 'Karnataka' },
      { state: 'Tamil Nadu' },
      { state: 'Telangana' }, 
      { state: 'West Bengal' },
      { state: 'Nagaland' },
      { state: 'Bihar' },
      { state: 'Chhatisgarh' },
      { state: 'Haryana' },
      { state: 'Jharkhand' }, 
      { state: 'Mizoram' },
      { state: 'Odisha' },
      { state: 'Punjab' },
      { state: 'Tripura' },
      { state: 'Uttar Pradesh' },
      { state: 'Uttarakhand' } 
		]

  }



  getCancerTypeArray(){
    return this.arrayCancerTypes.sort((a, b)=>{
      if(a["cancer"]<b["cancer"]){
        return -1;
      }else{
        return 1;
      }
    });
  }

  getHospitalTypeArray(){
    return this.arrayHospitalTypes.sort((a, b)=>{
      if(a["hospital"]<b["hospital"]){
        return -1;
      }else{
        return 1;
      }
    });
  }

  getStateArray(){
    return this.arrayStates.sort((a, b)=>{
      if(a["state"]<b["state"]){
        return -1;
      }else{
        return 1;
      }
    });
  }

  getDateinTimeStamp(date:Date){
    return date.toLocaleString();
  }

  getDateinDDMMYYYY(date:Date){
    return date.toLocaleDateString();
  }

  getDateDifferenceinDays(today,dbDate){
    let diffinMS:number = Date.parse(today)-Date.parse(dbDate);
    let diffinDays:number = diffinMS/1000/60/60/24;
    return diffinDays;
  }

  dateInRange(date, fromDate, toDate){
    if(isNullOrUndefined(fromDate) && isNullOrUndefined(toDate))
        return true;

    let diffFromFrom:number = Date.parse(date)-Date.parse(fromDate);
    let diffFromTO:number = Date.parse(toDate)-Date.parse(date);
    if(diffFromFrom>0 && diffFromTO>0)
      return true;
    return false;
  }
}
