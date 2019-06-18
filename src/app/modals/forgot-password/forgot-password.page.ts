import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  validated:boolean = false;
  public email:string;
  public pwd:string;
  public cnfpwd:string;
  public answer:string;

  constructor(private modalController : ModalController, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.email= "";
    this.pwd = "";
    this.cnfpwd = "";
    this.answer = "";
    this.validated = false;
  }

  validate() {
    if(this.checkValidation()) {
      this.validated = true;
    }
  }

  checkValidation() {
    if(this.email.length!=0 || this.answer.length!=0) {
      return true;
    }
    this.userService.presentAlert("Alert","Email or Answer cannot be left blank");
    return false;
  }

  async close(){
    this.validated = false;
    await this.modalController.dismiss();
  }

  resetEmail() {
    this.authService.resetPassword(this.email).then(() =>{
      this.userService.presentAlert("Success","Check your email for password reset");
    },
    error => {
      this.userService.presentAlert("Error",error.message);
    });
  }
}
