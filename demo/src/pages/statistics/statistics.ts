import { Component,ViewChild } from '@angular/core';
import { Rooms } from '../rooms/rooms';
import { Devices } from '../devices/devices';
import {Platform, IonicPage, ModalController, ViewController,NavController, NavParams ,AlertController, LoadingController} from 'ionic-angular';
import {  Headers,RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { UserlistPage } from '../userlist/userlist';
import { AdduserPage } from '../adduser/adduser';
import { UserprofilePage } from '../userprofile/userprofile';
import { DashboardPage } from '../dashboard/dashboard';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage {
   public sessionId:any;
   public userEmail:any;

   @ViewChild('barCanvas') barCanvas;
   @ViewChild('lineCanvas') lineCanvas;
    barChart: any;
     lineChart: any;

  constructor(public navCtrl: NavController,  private alertCtrl: AlertController,
  private loadingCtrl: LoadingController,public navParams: NavParams,public modalCtrl: ModalController,
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
      this.userDetails(session);
    }
    if (this.plt.is('android')) {
            this.storage.get('sessionId').then((data) => {
              if(data != null)
              {
                console.log("log::"+data);

                session=data;
                plat="android";
                    //this.sessionValidation(session,plat);
                    this.userDetails(session);
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
                this.userDetails(session);
            console.log("session in if::"+session);
          }
        });

      }
  }



    goToHome(){
    this.navCtrl.setRoot(DashboardPage);
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
                this.navCtrl.push(LoginPage, {  });
            }


            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
}


ionViewDidLoad() {

this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
          labels: ["10-Jun", "11-Jun", "12-Jun", "13-Jun", "14-Jun", "15-Jun", "16-Jun","17-Jun","18-Jun","19-Jun","20-Jun"],
          datasets: [
              {
                  label: "Units",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [55, 0, 46, 85, 90, 66, 70],
                  spanGaps: false,
              }
          ]
      }

  });

}

}
