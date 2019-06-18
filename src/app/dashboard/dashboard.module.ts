import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { AuthGuard } from '../services/user/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'statistics',
        loadChildren: '../statistics/statistics.module#StatisticsPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'refdata',
        loadChildren: '../refdata/refdata.module#RefdataPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'reporting',
        loadChildren: '../reporting/reporting.module#ReportingPageModule',
        canActivate: [AuthGuard]
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
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
