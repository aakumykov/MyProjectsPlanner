import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {

	constructor(public navCtrl: NavController, private authProvider: AuthProvider) {

	}

	logOut() {
		console.info('HomePage.logOut()');
		this.authProvider.logoutUser().then( arg => {
			this.navCtrl.setRoot('LandingPage');
		});
	}

}
