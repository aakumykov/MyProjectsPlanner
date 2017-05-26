import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = 'HomePage';

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		platform.ready().then(() => {
		 
			statusBar.styleDefault();
			splashScreen.hide();
			
			firebase.initializeApp({
				apiKey: "AIzaSyBDhOaoRxU0TKrU6SlI4bI4j_KlEUlO9c8",
				authDomain: "myprojectplanner-eee98.firebaseapp.com",
				databaseURL: "https://myprojectplanner-eee98.firebaseio.com",
				projectId: "myprojectplanner-eee98",
				storageBucket: "myprojectplanner-eee98.appspot.com",
				messagingSenderId: "600991054412"
			});
			
		});
	}
}
