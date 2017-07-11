import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

/*
  Generated class for the SplitProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SplitProvider {


  splitPaneState: boolean;

	constructor(public platform: Platform,public http: Http) {
		this.splitPaneState = false;
     console.log('Hello SplitProvider Provider');
	}

	setSplitPane(state: boolean) {
		if (this.platform.width() > 992) {
			this.splitPaneState = state;
		} else {
			this.splitPaneState = false;
		}
	}

	getSplitPane() {
		return this.splitPaneState;
	}

}
