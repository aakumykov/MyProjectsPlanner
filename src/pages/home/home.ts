import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TeamProvider } from '../../providers/team/team';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	public isAdmin: boolean = false;

	constructor(
		public navCtrl: NavController, 
		private authProvider: AuthProvider,
		private teamPrivider: TeamProvider
	) {
		this.teamPrivider.getAdminStatus().then( adinStatus => {
			this.isAdmin = adinStatus;
		});
	}

	logOut() {
		this.authProvider.logoutUser().then( arg => {
			this.navCtrl.setRoot('LandingPage');
		});
	}

	addTask() {
		// if (this.isAdmin) this.navCtrl.push('TaskCreatePage');
		this.navCtrl.push('TaskCreatePage');
	}


}
