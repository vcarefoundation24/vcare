import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { UserService } from './user.service'

@Injectable()
export class AuthService implements CanActivate {

	profileActive:boolean = false;

	constructor(private router: Router, private user: UserService) {
		this.profileActive = false;
	}

	async canActivate(route) {
		if(this.user.isLoggedIn()){
			return true;
		}
		this.router.navigate(['/login']);
	}
}