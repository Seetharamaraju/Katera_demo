import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController, Loading } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import {  Headers,RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';


/**
 * Generated class for the ControllerVerificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-controller-verification',
  templateUrl: 'controller-verification.html',
})
export class ControllerVerificationPage {

  controllerCredentials = { controllerID: '' };
  constructor(public navCtrl: NavController, public http: Http,public navParams: NavParams,public alertCtrl:AlertController, public loadingController: LoadingController) {
  }

  public verify() {

   let loader = this.loadingController.create({
      content: "Please Wait..."
    });
   loader.present();

    let controllerID: any = this.controllerCredentials.controllerID;
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append('Access-Control-Allow-Origin','*');
    let options = new RequestOptions({ headers: headers });

    let postParams = {
      controllerId: controllerID,
    }
    //this.navCtrl.push(RegisterPage, {});

      this.http
        .post('http://192.168.1.222:8085/service/ControllerVerify', postParams, options)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data.status);
              if(data.status == 'success'){
                loader.dismiss();
                this.navCtrl.push(RegisterPage, {
                  controllerId: controllerID
                });
              }else{
                loader.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Registration Failed',
                  subTitle: 'Sorry !! '+data.message,
                  buttons: ['OK']
                });
              alert.present();
              }
            },
            err => {
              loader.dismiss();
              console.log("ERROR!: ", err);
            }
        );
  }
  loginback(){
 this.navCtrl.push(LoginPage, {  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControllerVerificationPage');
  }

}
