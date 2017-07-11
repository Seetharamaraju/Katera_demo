import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserprofilePage } from '../userprofile/userprofile';
import { UsermanagementPage } from '../usermanagement/usermanagement';
import { Devices } from '../devices/devices';

@Component({
  selector: 'page-intermediatepage',
  templateUrl: 'intermediatepage.html'
})
export class IntermediatePage {

  posts: any;
 
  constructor(public navCtrl: NavController, public http: Http) {

   





  	 //this.http.get('http://localhost/slim/sample.php/listingRooms').map(res => res.json()).subscribe(data => {
        //this.posts = data.data.children;
        //console.log(data.data.children);
    //});
    //this.posts = null;
 
	//this.http.get('http://192.168.1.198/slim/sample.php/listingRooms').map(res => res.json()).subscribe(data => {
	    //this.posts = data.data;
	    //console.log(this.posts);
	//});

  
  }
  usermanage(){
         this.navCtrl.setRoot(UsermanagementPage);
    }

  dashboardFunction(){
          this.navCtrl.setRoot(DashboardPage);
    }
    deviceFunction(){
       this.navCtrl.setRoot(Devices);
    }
}