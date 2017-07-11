import { Component , ViewChild} from '@angular/core';
import { NavController, NavParams ,AlertController } from 'ionic-angular';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { Http } from '@angular/http';
//import {HomePage } from '../home/home';
import {LoginPage } from '../login/login';
import {  Headers,RequestOptions } from '@angular/http';


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
public controllerId:any;
optionsList: Array<{ value: number, text: string, checked: boolean }> = [];
categories = [{accountType: 'Basic',},{accountType: 'Premium',}];
@ViewChild('inputFocus') myInput ;
  notify:any = false;
  //form;
  form: FormGroup;

	constructor(public navCtrl: NavController,public formBuilder: FormBuilder,public http: Http,public navParams: NavParams,public alertCtrl:AlertController ) {
        this.controllerId = navParams.get("controllerId");
        this.form = formBuilder.group({
          firstName: ['', Validators.compose([Validators.minLength(2),Validators.maxLength(18), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          lastName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          userEmail: ['', Validators.compose([Validators.required,this.emailValidator])],
          userPassword: ['',Validators.compose([Validators.required,this.passwordValidator,Validators.minLength(8),Validators.maxLength(40), Validators.required])],
          cnfmpassword: ['',Validators.compose([Validators.maxLength(40), this.passwordMatch,Validators.required])],
          userCity: ['', Validators.compose([Validators.required])],
          userSSN: [''],
          userState: ['', Validators.compose([Validators.required])],
          accountType: ['', Validators.compose([Validators.required])],
          siteType: ['', Validators.compose([Validators.required])],
          /*
          firstName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(18),Validators.pattern('[a-zA-Z ]*')]),
          lastName: new FormControl("",Validators.required,Validators.pattern('[a-zA-Z ]*')),
          userEmail:new FormControl("",Validators.required),
          userPassword: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(40)]),
          cnfmpassword: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(40)]),
          userCity: new FormControl("",Validators.required),
          userSSN: new FormControl("",Validators.required),
          userState: new FormControl("",Validators.required),
          accountType: new FormControl("",Validators.required),
          siteType: new FormControl("",Validators.required),
          */
        });

  	}

  ionViewDidLoad() {
    	console.log('ionViewDidLoad AdduserPage');
    }
    formErrors = {
      'username': [],
    };

    emailValidator(control) {
      var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      if (!EMAIL_REGEXP.test(control.value)) {
        return {invalidEmail: true};
      }
    }
    passwordValidator(control) {
      //var PASSWORD_REGEXP = /^[\w -]*$/;
        var PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/;
      if (!PASSWORD_REGEXP.test(control.value)) {
        return {invalidEmail: true};
      }
    }

    passwordMatch(control) {
      if (control.root.value['cnfmpassword'] == control.root.value['userPassword']) {
        console.log(control.root.value['userPassword']);
	console.log(control.root.value['cnfmpassword']);
        return { isValid: true };
      } else {
        return null;

      }
    }
  goBackToSighnup(){
//     this.navCtrl.push(controller-verification);
this.navCtrl.pop();
  }
  signLogin(){

      console.log('the first name is...'+this.form.value['firstName']);
      if(this.form.value['firstName'] == undefined || this.form.value['lastName'] == undefined || this.form.value['userEmail'] == undefined
          || this.form.value['userPassword'] == undefined || this.form.value['accountType'] == undefined || this.form.value['siteType']== undefined){
          let alert = this.alertCtrl.create({
            title: 'Registration Failed !!',
            subTitle: 'Please Fill all Details to Make Registration',
            buttons: ['OK']
          });
        alert.present();
      }else if(this.form.value['userPassword']!=this.form.value['cnfmpassword']){
         let alert = this.alertCtrl.create({
           title: 'Alert !!',
           subTitle: 'Password and Confirm Password Should Be Same',
           buttons: ['OK']
          });
          alert.present();
        }else{
        console.log(this.form);
        console.log(this.form.value['accountType']);

         var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         headers.append('Access-Control-Allow-Origin','*');
         let options = new RequestOptions({ headers: headers });
          let postParams = {
            firstName: this.form.value['firstName'],
            lastName: this.form.value['lastName'],
            email: this.form.value['userEmail'],
            password: this.form.value['userPassword'],
            userCity:this.form.value['userCity'],
            userState:this.form.value['userState'],
            userSSN:this.form.value['userSSN'],
            accountType:this.form.value['accountType'],
            siteType:this.form.value['siteType'],
            controllerId: this.controllerId
          }
          this.http
            .post('http://192.168.1.222:8085/service/Register', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log(data.status);
                  if(data.status == 'success'){
                    this.navCtrl.push(LoginPage, {});
                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Registration Failed',
                      subTitle: 'Sorry !! '+data.message,
                      buttons: ['OK']
                    });
                  alert.present();
                  }
                },
                err => {
                  console.log("ERROR!: ", err);
                }

            );
        }
    }
}
