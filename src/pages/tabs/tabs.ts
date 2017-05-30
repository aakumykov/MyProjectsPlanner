import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TeamProvider } from '../../providers/team/team';

@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root: string = 'HomePage';
	tab2Root: string = 'TeamPage';
	isAdmin: boolean = false;

	constructor(private teamProvider: TeamProvider) {
		this.teamProvider.getAdminStatus().then(adminStatus => {
			this.isAdmin = adminStatus;
		});
	}
}
