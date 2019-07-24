import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { HttpModule } from '@angular/http'
import { UserService } from './user.service';
import { AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import { AuthService } from './services/user/auth.service';
import {AuthGuard} from './services/user/auth.guard'
import { ShareModule } from './share.module';
import { ForgotPasswordPageModule } from './modals/forgot-password/forgot-password.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {File} from '@ionic-native/file/ngx'
import { environment } from 'src/environments/environment.prod';
import { ExcelExportService } from './services/user/excel-export.service';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		HttpModule,
		ShareModule,
		ForgotPasswordPageModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		UserService,
		AuthService,
		AuthGuard,
		File,
		ExcelExportService,
		{ provide: FirestoreSettingsToken, useValue: {} }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
