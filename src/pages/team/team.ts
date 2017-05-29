import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TeamProvider } from '../../providers/team/team';


@IonicPage()
@Component({
	selector: 'page-team',
	templateUrl: 'team.html',
})
export class TeamPage {
	public teamProfile: any;
	public pendingInvitationList: any;
	public pendingRequestList: any;

	constructor(public navCtrl:NavController, public alertCtrl:AlertController, 
	public teamProvider:TeamProvider) {}

	ionViewDidLoad() {
		this.getTeamProfile();
		this.getPendingInvitationList();
		this.getPendingRequestList();
	}

	getTeamProfile(){
		this.teamProvider.getTeamProfile().then( teamProfileSnapshot => {
			this.teamProfile = teamProfileSnapshot;
		});
	}

	getPendingInvitationList(){
		this.teamProvider.getPendingInvitationList().then( pendingInvitationList => {
			this.pendingInvitationList = pendingInvitationList;
		});
	}

	getPendingRequestList(){
		this.teamProvider.getPendingRequestList().then( pendingRequestList => {
			this.pendingRequestList = pendingRequestList;
		});
	}

	inviteTeamMember(): void {
		let prompt = this.alertCtrl.create({
			title: 'Пригласить участника',
			message: "Укажите e-mail участника, чтобы пригласить его в приложение",
			inputs: [
				{
					name: 'name',
					placeholder: "Имя участника",
					type: 'text'
				},
				{
					name: 'email',
					placeholder: "E-mail участника",
					type: 'email'
				},
			],
			buttons: [
				{
					text: 'Отмена',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Пригласить',
					handler: data => {
						this.teamProvider.inviteTeamMember(data.email, data.name, this.teamProfile.teamId, 
							this.teamProfile.teamName).then( () => { this.getPendingInvitationList(); });
					}
				}
			]
		});
		prompt.present();
	}

	acceptTeamMember(memberId: string, inviteId: string, memberName: string): void {
		let alert = this.alertCtrl.create({
			title: 'Принять участника',
			message: `Уверены, что хотите принять ${memberName} в свою команду?`,
			buttons: [
				{
					text: 'Нет',
					handler: data => {
						console.log('Cancel (No) clicked');
					}
				},
				{
					text: 'Да',
					handler: data => {
						this.teamProvider.acceptTeamMember(memberId, inviteId).then( () => { 
							this.getPendingRequestList(); 
						});
					}
				}
			]
		});
		alert.present();
	}
}