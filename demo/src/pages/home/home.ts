import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {  Headers,RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
//import { BedroomPage } from '../bedroom/bedroom';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public sessionId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public plt: Platform,public http: Http,public storage : Storage) {
    this.sessionId = navParams.get("sessionId");
    if (this.plt.is('core')) {
      alert("core");
      console.log("I'm an desktop device!");
      var c: any;
      var C: any ;
      c = document.cookie.split( ';' );
      var cookies = {};
      for(var i = c.length - 1; i >= 0; i--){
        C = c[i].split( '=' );
        C[0] = C[0].replace( " ", "" );
        console.log("hi c::"+C[0]);
        C[0].trim();
        console.log("hi c trim::"+C[0]);
        console.log("hi c trims::"+C[1]);
        if(C[0] == "sessionId"){
          cookies[C[0]] = C[1];
          }
      }
       console.log(cookies["sessionId"]);
       var headers = new Headers();
       headers.append("Accept", 'application/json');
       headers.append('Content-Type', 'application/json' );
       headers.append('Access-Control-Allow-Origin','*');
       let options = new RequestOptions({ headers: headers });

       let postParams = {
          sessionId: cookies["sessionId"],
          platform:"browser"
        }

       this.http
        .post('http://192.168.1.222:8085/service/session', postParams, options)
        .map(res => res.json())
        .subscribe(

            data => {
              //console.log("hi::"+JSON.stringify(data));
              console.log("user::"+data.status);
              console.log("sessionID::"+data.sessionId);
              if(data.status=="success")
              {
                console.log("status1 in desktop::"+data.status);
              }
              else{
                // this.showError("Access Denied");
                console.log("status2 in desktop::"+data.status);
                this.navCtrl.push(LoginPage, {  });
              }
              //console.log(data.data.emailID);

            },
            err => {
              console.log("ERROR!: ", err);
            }

        );

    }
    var session;
     if (this.plt.is('android')) {


        alert("android");
        //console.log("I'm an android device!");
        // this.storage.set('sessionId',{"sessioId":data.sessionId});
        //var session = this.storage.get('loggeduser').then((val)=>console.log("loggeduser::"+JSON.stringify(val)));
        this.storage.get('sessionId').then((data) => {
          alert("hi");
       if(data != null)
       {
         console.log("log::"+data);

         session=data;
         console.log("session in if::"+session);
       }
     });
     console.log("session out if::"+session);

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin','*');
        let options = new RequestOptions({ headers: headers });
        console.log("android session::"+session);
        let postParams = {
          sessionId: this.sessionId,
          platform:"android"

          //sessionId:"MWX3BL5BPJFWJI8J"
        }
        console.log("postparams of android::"+JSON.stringify(postParams));
        this.http
        .post('http://192.168.1.222:8085/service/session', postParams, options)
        .map(res => res.json())
        .subscribe(

            data => {
              //console.log("hi::"+JSON.stringify(data));
              console.log("user::"+data.status);
              console.log("sessionID::"+data.sessionId);
              if(data.status=="success")
              {
                console.log("status1 in android::"+data.status);
              }
              else{
                // this.showError("Access Denied");
                console.log("status2 in android::"+data.status);
                this.navCtrl.push(LoginPage, {  });
              }
                   //console.log(data.data.emailID);

            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
            }

             if (this.plt.is('ios')) {

                  alert("ios");
                  console.log("I'm an apple device!");
                 // this.storage.set('sessionId',{"sessioId":data.sessionId});
                // var session = this.storage.get('session').then((val)=>console.log("storageval::"+JSON.stringify(val)));
                  var headers = new Headers();
                  headers.append("Accept", 'application/json');
                  headers.append('Content-Type', 'application/json' );
                  headers.append('Access-Control-Allow-Origin','*');
                  let options = new RequestOptions({ headers: headers });
                  let postParams = {
                    sessionId: session
                    //sessionId:"MWX3BL5BPJFWJI8J"
                  }
                  console.log("postparams of android::"+JSON.stringify(postParams));
                  this.http
                  .post('http://192.168.1.222:8085/service/session', postParams, options)
                  .map(res => res.json())
                  .subscribe(

                      data => {
                        //console.log("hi::"+JSON.stringify(data));
                        console.log("user::"+data.status);
                        console.log("sessionID::"+data.sessionId);
                        if(data.status=="success")
                        {
                          console.log("status1 in ios::"+data.status);
                        }
                        else{
                          // this.showError("Access Denied");
                          console.log("status2 in ios::"+data.status);
                          this.navCtrl.push(LoginPage, {  });
                        }
                            //console.log(data.data.emailID);

                      },
                      err => {
                        console.log("ERROR!: ", err);
                      }
                  );
            }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

public bedroomDevices(){
    //this.loading.dismiss();
    //alert("hi");
  	//this.navCtrl.push(BedroomPage, {  });
  }
}
