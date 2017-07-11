import { Component,ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';
import { Headers,RequestOptions } from '@angular/http';
import { RegisterPage } from '../pages/register/register';
import { ControllerVerificationPage } from '../pages/controller-verification/controller-verification';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Alarms } from '../pages/alarms/alarms';
import { Devices } from '../pages/devices/devices';
import { Rooms } from '../pages/rooms/rooms';
import { UserlistPage } from '../pages/userlist/userlist';
import { AdduserPage } from '../pages/adduser/adduser';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { IntermediatePage } from '../pages/intermediatepage/intermediatepage';
import { UsermanagementPage } from '../pages/usermanagement/usermanagement';
import { PromotionsPage } from '../pages/promotions/promotions';
import { ModalContentPage} from '../pages/promotions/promotions';
import { FavouritesPage} from '../pages/favourites/favourites';
import { SplitProvider } from '../providers/split/split';
import { StatisticsPage } from '../pages/statistics/statistics';
import { RoomStatisticsPage } from '../pages/roomstatistics/roomstatistics';
import { SchedulePage } from '../pages/schedule/schedule';
//import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';

@Component({
  templateUrl: 'app.html'
})
/*export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
*/
export class MyApp { 
   @ViewChild(Nav) nav: Nav;  
   rootPage: any = LoginPage;  
   pages: Array<{title: string, component: any,icon:string}>;  
   constructor(public platform: Platform, public statusBar: StatusBar,public storage : Storage, 
   public splashScreen: SplashScreen,public plt: Platform,public http: Http) {   
      this.initializeApp();    
      // used for an example of ngFor and navigation    
      this.pages = [      
        { title: 'Dashboard', component: DashboardPage,icon:'md-desktop' },      
             
        { title: 'Devices', component: Devices,icon:'md-bulb' },     
        { title: 'Alarms', component: Alarms,icon: 'md-alarm' },
        { title: 'User Profile', component: UserprofilePage,icon:'person' },      
        { title: 'User List', component: UserlistPage,icon:'people' },      
        { title: 'Add User', component: AdduserPage,icon:'person-add' },
        { title: 'Logout',component:null,icon:"log-out"} ,
        { title: 'UserManagement',component:UsermanagementPage,icon:"people"},   
         { title: 'Promotions',component:PromotionsPage,icon:"eye"} ,
          { title: 'Favourites',component:FavouritesPage,icon:"heart"}       
         
         ];  
        }  
        initializeApp() {    
          this.platform.ready().then(() => {      
            // Okay, so the platform is ready and our plugins are available.      
            // Here you can do any higher level native things you might need.     
             this.statusBar.styleDefault();   
                this.splashScreen.hide();    
              });  
            }  
            openPage(page) {  
              var session;  
              // Reset the content nav to have just this page    
              // we wouldn't want the back button to show in this scenario   
              // this.nav.push(page.component); 
               if(page.component){
                     this.nav.setRoot(page.component);
                }
                else{
                    console.log("loggingout..");
                    if (this.plt.is('core')) {
                        var x = document.cookie;                
                        console.log(x);
                        var c;
                        var C;
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
                          //var ses = "";
                    //document.cookie = "sessionId=" + ses;
                    // console.log( cookies );
                      session=cookies["sessionId"];
                      this.logoutSession(session);
                      console.log("hi desktop logout");
                 }
               
                  if (this.plt.is('android')) {
                // this.storage.remove('sessionId').then((val) => {
        
                 //});
                      this.storage.get('sessionId').then((data) => {
                      if(data != null)
                      {
                      console.log("log::"+data);
                      session=data;  
                      this.logoutSession(session);
                      console.log("session in logout android if::"+session);
                    }
                    });
                  }
                   if (this.plt.is('ios')) {
                        this.storage.get('sessionId').then((data) => {
                        if(data != null)
                        {
                        console.log("log::"+data);
                        session=data; 
                          this.logoutSession(session); 
                        console.log("session in logout ios  if::"+session);
                      }
                      });
                   }

                  this.nav.setRoot(LoginPage);
                 }
              }

logoutSession(session){
   var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin','*');
        let options = new RequestOptions({ headers: headers });
        console.log("session in API logout ::"+session);
        let postParams = {
          sessionId: session,
        

        }
        console.log("postparams  of logout::"+JSON.stringify(postParams));
        this.http
        .post('http://192.168.1.229:8080/springexample/logout', postParams, options)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log("user::"+data.status);
              if(data.status=="success")
              {
                console.log("suceess in logout::"+data.status);
               if (this.plt.is('core')) {
                 console.log("hi desktop function logout");
                 var ses = "";
                    document.cookie = "sessionId=" + ses;
                     console.log( "cookies removed" );
                     this.nav.push(LoginPage, {  });
               }
               if (this.plt.is('android')) {
              this.storage.remove('sessionId').then((val) => {
        
                 });
                 this.nav.push(LoginPage, {  });
               }
                if (this.plt.is('ios')) {
              this.storage.remove('sessionId').then((val) => {
        
                 });
                 this.nav.push(LoginPage, {  });
                }
              }
              else{
                // this.showError("Access Denied");
                console.log("status2 in logout details::"+data.status);
              
              }
          
            },
            err => {
              console.log("ERROR!: ", err);
            }  
        );
      }
  

            }