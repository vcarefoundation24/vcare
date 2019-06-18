import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service'
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path:'login', loadChildren: './login/login.module#LoginPageModule'},
  { path: '', loadChildren: './menu/menu.module#MenuPageModule',canActivate: [AuthGuard] },
  { path: 'patient-services', loadChildren: './patient/patient-services/patient-services.module#PatientServicesPageModule',canActivate: [AuthGuard] },
  { path: 'show-services', loadChildren: './patient/show-services/show-services.module#ShowServicesPageModule',canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
