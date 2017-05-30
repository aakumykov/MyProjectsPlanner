import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TeamProvider } from '../../providers/team/team';
import { TaskProvider } from '../../providers/task/task';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	public isAdmin: boolean = false;
	public taskList: Array<any> = [];
	public userProfile: Object = {};

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		private authProvider: AuthProvider,
		private teamProvider: TeamProvider,
		private taskProvider: TaskProvider,
	) {}

	ionViewDidEnter(): void {
		this.teamProvider.getAdminStatus().then( adinStatus => {
			this.isAdmin = adinStatus;
		});

		this.teamProvider.getUserProfile().then( profile => {
			this.userProfile = profile;
		});

		this.taskProvider.getTaskList().then( list => {
			this.taskList = list;
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

	completeTask(task): void {	
		let confirm = this.alertCtrl.create({
			title: 'Выполнили?',
			message: 'Нажмите Да, чтобы пометить задание завершённым',
			buttons: [
				{
					text: 'Да',
					handler: () => {
						this.taskProvider.completeTask(task.taskId).then( () => {
						task.completed = true;
						});
					}
				},
				{
					text: 'Нет',
					role: 'cancel'
				}
			]
		});
		confirm.present();
	}
}
