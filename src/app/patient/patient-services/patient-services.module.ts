import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PatientServicesPage } from './patient-services.page';

const routes: Routes = [
	{
		path: '',
		component: PatientServicesPage,
		children: [
      { path: 'counselling', loadChildren: '../counselling/counselling.module#CounsellingPageModule' },
      { path: 'financialServices', loadChildren: '../financial-services/financial-services.module#FinancialServicesPageModule' },
      { path: 'supplies', loadChildren: '../supplies/supplies.module#SuppliesPageModule' }
		]
	}	
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [PatientServicesPage]
})
export class PatientServicesPageModule {}
