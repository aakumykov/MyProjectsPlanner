import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	public rootPage: string;
	public zone: NgZone;	

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		firebase.initializeApp({
			apiKey: "AIzaSyBDhOaoRxU0TKrU6SlI4bI4j_KlEUlO9c8",
			authDomain: "myprojectplanner-eee98.firebaseapp.com",
			databaseURL: "https://myprojectplanner-eee98.firebaseio.com",
			projectId: "myprojectplanner-eee98",
			storageBucket: "myprojectplanner-eee98.appspot.com",
			messagingSenderId: "600991054412"
		});

		this.zone = new NgZone({});

		const unsubscribe = firebase.auth().onAuthStateChanged( 
			user => {
				this.zone.run(
					() => {
						if (!user) {
							this.rootPage = 'LandingPage';
							unsubscribe();
						} else {
							firebase.database()
								.ref(`/userProfile/${firebase.auth().currentUser.uid}`)
								.once('value', userProfile => {
										if (userProfile.val().active === true){
											this.rootPage = 'TabsPage';
										} else {
											this.rootPage = 'WaitingPage';
										}
									}
								); 
							unsubscribe();
						}
					}
				);
			}
		);


		platform.ready().then(() => {
		 
			statusBar.styleDefault();
			splashScreen.hide();			
		});
	}
}
