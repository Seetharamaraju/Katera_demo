import { Component,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,NavParams,LoadingController,AlertController,Slides} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {  Headers,RequestOptions } from '@angular/http';
import { LoginPage } from '../login/login';
import { StatisticsPage } from '../statistics/statistics';
import { Alarms } from '../alarms/alarms';
import { SchedulePage } from '../schedule/schedule';
import { Rooms } from '../rooms/rooms';
//import { Mqttservice } from '../../providers/mqttservice';
//import { Networkalert } from '../../providers/networkalert';
//import { DisplayGraphPage } from '../display-graph/display-graph';

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html'
})

export class FavouritesPage {
  @ViewChild('pageSlider') pageSlider: Slides;
 tabs: any = '0';

items: any;
  item:any;
     devicesArray:any = [];
     roomsArray:any = [];
  data:any;
  username :any;
  scheduleTimer:any;
      public sessionId:any;
      public favstatus:any;
  myIcon : string = "heart";
  constructor(public navCtrl: NavController, public navParams: NavParams,public plt: Platform,private alertCtrl: AlertController,
   public http: Http,public storage:Storage,public loadingCtrl: LoadingController) {

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
         this.sessionId=cookies["sessionId"];
        plat="browser";

this.devicesList( this.sessionId);
this.roomsList( this.sessionId);
    }

     if (this.plt.is('android')) {

            this.storage.get('sessionId').then((data) => {
              if(data != null)
              {
                console.log("log::"+data);

                this.sessionId=data;
                plat="android";
                   // this.sessionValidation(session,plat)
                   this.devicesList( this.sessionId);
                   this.roomsList( this.sessionId);
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

             this.sessionId=data;
            plat="ios";
           this.devicesList( this.sessionId);
           this.roomsList( this.sessionId);
                //this.sessionValidation(session,plat)
            console.log("session in if::"+session);
          }
        });

      }
	}
       ionViewDidLoad() {
   console.log('ionViewDidLoad SwipeTabsPage');
 }
 selectTab(index) {
this.pageSlider.slideTo(index);
 }

  devicesList(session){
    console.log("hi fav devices");
       var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         headers.append('Access-Control-Allow-Origin','*');
         let options = new RequestOptions({ headers: headers });
          let postParams = {
                 sessionId:session

          }
          this.http
            .post('http://192.168.1.222:8085/service/listFavouriteDevices', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("sdata in function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){
                    this.devicesArray = data.devices;
                    console.log("dataa in favorites:::"+JSON.stringify( this.devicesArray));
                    //this.showLoading();
                    //this.navCtrl.setRoot(LoginPage, {});
                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Devices fetch Failed',
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


  roomsList(session){
    console.log("hi favourite roooms devices");
       var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         headers.append('Access-Control-Allow-Origin','*');
         let options = new RequestOptions({ headers: headers });
          let postParams = {
                 sessionId:session

          }
          this.http
            .post('http://192.168.1.222:8085/service/listFavouriteRooms', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("sdata in room function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){
                    this.roomsArray = data.rooms;
                    console.log("dataa in rooms favorites:::"+JSON.stringify( this.devicesArray));
                    //this.showLoading();
                    //this.navCtrl.setRoot(LoginPage, {});
                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Rooms fetch Failed',
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
alarmFunc(){
  this.navCtrl.setRoot(Alarms, {  });
}
scheduleFunc(){
  this.navCtrl.setRoot(SchedulePage, {  });
}


getRoomFavourite(room){

   console.log("Favourite devices");
       var headers = new Headers();
         headers.append("Accept", 'application/json');
         headers.append('Content-Type', 'application/json' );
         headers.append('Access-Control-Allow-Origin','*');
         let options = new RequestOptions({ headers: headers });
         let action:any;
         let postParams:any;
         if(room.favourites ==false){
           postParams = {
                 sessionId:this.sessionId,
                 roomID:room.roomID,
                 devID:room.devID,
                 action:"addFav"

          }
         } else{
           postParams = {
                 sessionId:this.sessionId,
                 roomID:room.roomID,
                 devID:room.devID,
                  action:"removeFav"

          }
          }
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
                    console.log("datafav"+data.message);
                    // this.devicesList( this.sessionId);
                    //this.showLoading();
                    //this.navCtrl.setRoot(LoginPage, {});
                    this.roomsList( this.sessionId);
                     this.devicesList( this.sessionId);
                  }else{
                    let alert = this.alertCtrl.create({
                      title: 'Room Favourites Not added',
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
room_details(room_name){
  this.navCtrl.push(Rooms,{roomName:room_name});
  }

getFavourite(device){

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
                 sessionId:this.sessionId,
                 roomID:device.roomID,
                 devID:device.devID,
                 action:"addFav"

          }
         } else{
           postParams = {
                 sessionId:this.sessionId,
                 roomID:device.roomID,
                 devID:device.devID,
                  action:"removeFav"

          }
          }
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
                    console.log("datafav"+data.message);
                    // this.devicesList( this.sessionId);
                    //this.showLoading();
                    //this.navCtrl.setRoot(LoginPage, {});
                     this.devicesList( this.sessionId);
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
changeStatus(device){

  var actions;
  if(device.currentStatus == true){
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
      sessionId:this.sessionId,
      roomID:device.roomID,
      devID:device.devID,
      action:actions
    }
    console.log("parameters");
    console.log(JSON.stringify(postParams));

            this.http
            .post('http://192.168.1.222:8085/service/toggleDevice', postParams, options)
            .map(res => res.json())
            .subscribe(
                data => {
                  console.log("fav data in function::"+JSON.stringify(data));
                  console.log(data.sessionStatus);
                  if(data.sessionStatus=="success"){
                  if(data.status == 'success'){

                    console.log("toggle function for favourite devices");
                     this.devicesList( this.sessionId);

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


changemasterStatus(room){

  var actions;
  if(room.masterStatus == true){
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
      sessionId:this.sessionId,
      roomID:room.roomID,
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

                    console.log("toggle function for favourite devices");
                     this.devicesList(this.sessionId);
                       this.roomsList(this.sessionId);

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
changeWillSlide($event) {
 this.tabs = $event._snapIndex.toString();
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
