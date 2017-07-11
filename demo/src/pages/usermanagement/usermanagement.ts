import { Component } from '@angular/core';
import { Rooms } from '../rooms/rooms';
import { Devices } from '../devices/devices';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {  Headers,RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { UserlistPage } from '../userlist/userlist';
import { AdduserPage } from '../adduser/adduser';
import { UserprofilePage } from '../userprofile/userprofile';


@Component({
  selector: 'page-usermanagement',
  templateUrl: 'usermanagement.html'
})
export class UsermanagementPage {
   public sessionId:any;
 public userEmail:any;



  constructor(public navCtrl: NavController,  private alertCtrl: AlertController,
  private loadingCtrl: LoadingController,public navParams: NavParams,
  public plt: Platform,public http: Http,public storage : Storage) {
 this.sessionId = navParams.get("sessionId");

 var session;


 var plat;
  if (this.plt.is('core')) {

      console.log("I'm an desktop device!");
      var c: any;
      var C: any ;
      c = document.cookie.split( ';' );
      var cookies = {};
      for(var i = c.length - 1; i >= 0; i--){
        C = c[i].split( '=' );
        C[0] = C[0].replace( " ", "" );

        C[0].trim();

        if(C[0] == "sessionId"){
          cookies[C[0]] = C[1];
          }
      }
       console.log(cookies["sessionId"]);
        session=cookies["sessionId"];
        plat="browser";
      //this.sessionValidation(session,plat);
      //this.userDetails(session);
    }

     if (this.plt.is('android')) {

            this.storage.get('sessionId').then((data) => {
              if(data != null)
              {
                console.log("log::"+data);

                session=data;
                plat="android";
                    //this.sessionValidation(session,plat);
                   // this.userDetails(session);
                console.log("session in if::"+session);
              }
            });

        }

        if (this.plt.is('ios')) {

            console.log("I'm an apple device!");
            this.storage.get('sessionId').then((data) => {

          if(data != null)
          {
            console.log("log::"+data);

            session=data;
            plat="ios";
                //this.sessionValidation(session,plat);
               // this.userDetails(session);
            console.log("session in if::"+session);
          }
        });

      }
  }
  userprofile(){
         this.navCtrl.setRoot(UserprofilePage);
    }
    userlist(){
         this.navCtrl.setRoot(UserlistPage);
    }
    adduser(){
         this.navCtrl.setRoot(AdduserPage);
    }

  sessionValidation(session,plat){
console.log("sesion in function::"+session);
    var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin','*');
        let options = new RequestOptions({ headers: headers });
        console.log("android session::"+session);
        let postParams = {
          sessionId: session,
          platform: plat

        }
        console.log("postparams of android::"+JSON.stringify(postParams));
        this.http
        .post('http://192.168.1.222:8085/service/session', postParams, options)
        .map(res => res.json())
        .subscribe(

            data => {

              console.log("user::"+data.status);
              console.log("sessionID::"+data.sessionId);
              if(data.status=="success")
              {
                this.userEmail = data.email;
                console.log("status1 in android::"+data.email);
                 this.userDetails(this.userEmail);
              }
              else{
                // this.showError("Access Denied");
                console.log("status2 in android::"+data.status);
                this.showError("Session Expired");

                this.navCtrl.push(LoginPage, {  });
              }

            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
}
 userDetails(session){
  // var details = ['FirstName','LastName','City','State','SSN','Email','Usertype','ControllerId'];
//var lastname,city,state,ssn,email,usertype,controllerId;
    var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin','*');
        let options = new RequestOptions({ headers: headers });
        console.log("session in API::"+session);
        let postParams = {
          sessionId: session,


        }
        console.log("postparams 1  of android::"+JSON.stringify(postParams));
        this.http
        .post('http://192.168.1.222:8085/service/getUser', postParams, options)
        .map(res => res.json())
        .subscribe(

            data => {
              //console.log("hi::"+JSON.stringify(data));
              console.log("user::"+data.status);
              console.log("sessionID::"+data.sessionId);
              if(data.sessionStatus=="success"){
              if(data.status=="success")
              {
                console.log("status243 in android::"+data.status);


              }
              else{
                // this.showError("Access Denied");
                console.log("status2 in user details::"+data.status);


                this.navCtrl.push(LoginPage, {  });
              }
            }
            else{
               console.log("status2 in android::"+data.status);
                this.showError("Session Expired");

                this.navCtrl.push(LoginPage, {  });
            }


            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
}
  showError(text) {
   // this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
