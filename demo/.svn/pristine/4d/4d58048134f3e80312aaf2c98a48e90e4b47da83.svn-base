import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import {  Http, Headers, RequestOptions } from '@angular/http';
//import { Http } from '@angular/http'; 
import { HttpModule } from '@angular/http';
//import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
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
import { StatisticsPage } from '../pages/statistics/statistics';
import { SchedulePage } from '../pages/schedule/schedule';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { RoomStatisticsPage } from '../pages/roomstatistics/roomstatistics';
import { Device } from '@ionic-native/device';
import { ControllerVerificationPage } from '../pages/controller-verification/controller-verification';
import { SplitProvider } from '../providers/split/split';
//import { MongodbProvider } from '../providers/mongodb/mongodb';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    ControllerVerificationPage,
    DashboardPage,
    Alarms,
    Rooms,
    Devices,
    UserlistPage,
    AdduserPage,
    UserprofilePage,
    IntermediatePage,
    UsermanagementPage,
    PromotionsPage,
    ModalContentPage,
    FavouritesPage,
    StatisticsPage,
    SchedulePage,
    DatePicker,
    RoomStatisticsPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot()
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    ControllerVerificationPage,
    DashboardPage,
    Alarms,
    Rooms,
    Devices,
    UserlistPage,
    AdduserPage,
    UserprofilePage,
    IntermediatePage,
    UsermanagementPage,
    PromotionsPage,
    ModalContentPage,
    FavouritesPage,
    StatisticsPage,
    SchedulePage,
    DatePicker,
    RoomStatisticsPage
  ],
  providers: [
   // Storage,
   
    StatusBar,
    SplashScreen,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplitProvider
   
  ]
})
export class AppModule {}
