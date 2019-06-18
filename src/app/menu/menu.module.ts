import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { AuthGuard } from '../services/user/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'myprofile',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'searchPatient',
        loadChildren: '../patient/search/search.module#SearchPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'patientProfile',
        loadChildren: '../patient/profile/profile.module#ProfilePageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'patientServices',
        loadChildren: '../patient/patient-services/patient-services.module#PatientServicesPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'patientServices',
        loadChildren: '../patient/patient-services/patient-services.module#PatientServicesPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'showServices',
        loadChildren: '../patient/show-services/show-services.module#ShowServicesPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'registerPatient',
        loadChildren: '../patient/register/register.module#RegisterPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'donation',
        loadChildren: '../donation/donation.module#DonationPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'myprofile',
        loadChildren: '../myprofile/myprofile.module#MyprofilePageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        loadChildren: '../about/about.module#AboutPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'contact',
        loadChildren: '../contact/contact.module#ContactPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        loadChildren: '../logout/logout.module#LogoutPageModule'
      }
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
  declarations: [MenuPage]
})
export class MenuPageModule {}
