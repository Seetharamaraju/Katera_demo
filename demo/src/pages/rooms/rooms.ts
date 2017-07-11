import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import {  Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { StatisticsPage } from '../statistics/statistics';
import { RoomStatisticsPage } from '../roomstatistics/roomstatistics';
import { Alarms } from '../alarms/alarms';
import { SchedulePage } from '../schedule/schedule';

//@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})


export class Rooms {

  public session:any;
  pageTitle:any;
  public roomNames:any;
  public roomType:any;
  public masterSwitch:any;
  public roomFavourites:any;
   public activeDeviceCount:any;
    public totalDeviceCount:any;
  deviceslists:any = [];
    public favstatus:any;
     myIcon : string = "heart-outline";

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams,public http: Http, public plt: Platform,public storage : Storage) {

  this.pageTitle = navParams.get("roomID");
  this.roomNames=navParams.get("roomName");
  console.log("page title:");
  console.log(this.pageTitle);


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
        this.session=cookies["sessionId"];
        plat="browser";

        this.getRoomsPage(this.session);
    }

     if (this.plt.is('android')) {

            this.storage.get('sessionId').then((data) => {
              if(data != null)
              {
                console.log("log::"+data);

                this.session=data;
                plat="android";

                console.log("session in if::"+this.session);
                this.getRoomsPage(this.session);
              }
            });

        }

        if (this.plt.is('ios')) {

            console.log("I'm an apple device!");
            this.storage.get('sessionId').then((data) => {

          if(data != null)
          {
            console.log("log::"+data);

            this.session=data;
            plat="ios";

            console.log("session in if::"+this.session);
            this.getRoomsPage(this.session);
          }
        });

      }
  }



changemasterStatus(masterSwitch){

  var actions;
  if(masterSwitch == true){
      actions="ON";
  }
  else{
      actions="OFF";
  }

  console.log("device_changemasterStatus function");
  var headers = new Headers();
  headers.append("Accept", 'application/json');
   headers.append('Content-Type', 'application/json' );
    headers.append('Access-Control-Allow-Origin','*');
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      sessionId:this.session,
      roomID:this.pageTitle,
      action:actions
    }
    console.log("master room parameters");
    console.log(JSON.stringify(postParams));

            this.http
            .post('http://192.168.1.222:8085/service/toggleMasterStatus', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("fav data in function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){

                    console.log("toggle function for rooms devices");
                     this.getRoomsPage(this.session);
                    // this.devicesList(this.session);
                     //  this.roomsList(this.sessionId);

                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Toggle Failed',
                      subTitle: 'Sorry !! '+data.message,
                      buttons: ['OK']
                    });
                  alert.present();
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

  getRoomsPage(sessions){
  console.log("the getRoomsPage");
  var headers = new Headers();
  headers.append("Accept", 'application/json');
   headers.append('Content-Type', 'application/json' );
    headers.append('Access-Control-Allow-Origin','*');
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      sessionId:sessions,
      roomID:this.pageTitle
    }
    console.log("parameters");
    console.log(JSON.stringify(postParams));
             this.http
            .post('http://192.168.1.222:8085/service/roomsDetails', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("sdata in function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){
                    this.roomType = data.roomID;
                    this.roomFavourites = data.favourites;
                    this.masterSwitch=data.masterStatus;
                    this.deviceslists = data.devices;
                    this.activeDeviceCount=data.activeDeviceCount;
                    this.totalDeviceCount=data.totalDeviceCount;
                    console.log("devices list array :");
                    console.log(this.deviceslists);
                    console.log("room favourite::"+this.roomFavourites);
                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Registration Failed',
                      subTitle: 'Sorry !! '+data.message,
                      buttons: ['OK']
                    });
                  alert.present();
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

   makeFavouriteRoom(){
 // this.favstatus="true";
    console.log("Favourite devices");
       var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         headers.append('Access-Control-Allow-Origin','*');
         let options = new RequestOptions({ headers: headers });
         let action:any;
         let postParams:any;
         if(this.roomFavourites ==false){
           postParams = {
                 sessionId:this.session,
                 roomID:this.pageTitle,
                 action:"addFav"

          }
         } else{
           postParams = {
                 sessionId:this.session,
                 roomID:this.pageTitle,
                 action:"removeFav"

          }
        }

        console.log("room fav payload");
        console.log(JSON.stringify(postParams));

          this.http
            .post('http://192.168.1.222:8085/service/toggleFavouriteRoom', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("sdata in function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){
                    this.favstatus = data.message;
                    console.log("dataa:::fav");
                     this.getRoomsPage(this.session);
                    //this.showLoading();
                    //this.navCtrl.setRoot(LoginPage, {});
                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Favourites Rooms Not added',
                      subTitle: 'Sorry !! '+data.message,
                      buttons: ['OK']
                    });
                  alert.present();
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

device_changeStatus(deviceid,roomid,status_value){

  var actions;
  if(status_value == true){
      actions="ON";
  }
  else{
      actions="OFF";
  }


  console.log("device_changeStatus function");
  var headers = new Headers();
  headers.append("Accept", 'application/json');
   headers.append('Content-Type', 'application/json' );
    headers.append('Access-Control-Allow-Origin','*');
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      sessionId:this.session,
      roomID:roomid,
      devID:deviceid,
      action:actions

    }

    console.log("parameters");
    console.log(JSON.stringify(postParams));

            this.http
            .post('http://192.168.1.222:8085/service/toggleDevice', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("sdata in function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){

                    console.log("toggle function for device");


                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Registration Failed',
                      subTitle: 'Sorry !! '+data.message,
                      buttons: ['OK']
                    });
                  alert.present();
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



makeFavourite(device){
 // this.favstatus="true";
    console.log("Favourite devices");
       var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         headers.append('Access-Control-Allow-Origin','*');
         let options = new RequestOptions({ headers: headers });
         let action:any;
         let postParams:any;
         if(device.favourites ==false){
           postParams = {
                 sessionId:this.session,
                 roomID:device.roomID,
                 devID:device.devID,
                 action:"addFav"

          }
         } else{
           postParams = {
                 sessionId:this.session,
                 roomID:device.roomID,
                 devID:device.devID,
                  action:"removeFav"

          }
        }

        console.log("fav payload");
        console.log(JSON.stringify(postParams));

          this.http
            .post('http://192.168.1.222:8085/service/toggleFavouriteDevice', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("sdata in function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){
                    this.favstatus = data.message;
                    console.log("dataa:::fav");
                     this.getRoomsPage(this.session);
                    //this.showLoading();
                    //this.navCtrl.setRoot(LoginPage, {});
                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Favourites Not added',
                      subTitle: 'Sorry !! '+data.message,
                      buttons: ['OK']
                    });
                  alert.present();
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

statisticsFunc(){
  this.navCtrl.setRoot(StatisticsPage, {  });
}
roomStatisticsFunc(){
  this.navCtrl.setRoot(RoomStatisticsPage, {  });
}

alarmFunc(){
  this.navCtrl.setRoot(Alarms, {  });
}
scheduleFunc(){
  this.navCtrl.setRoot(SchedulePage, {  });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Devices');
  }
}
