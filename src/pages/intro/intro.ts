import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
	selector: 'page-intro',
	templateUrl: 'intro.html',
})
export class IntroPage {
	@ViewChild(Slides) slides: Slides;
	
	public getInvitationForm: FormGroup;
	public signupForm: FormGroup;
	public invitation: any = null;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
	public formBuilder: FormBuilder, public authProvider: AuthProvider) {
			this.getInvitationForm = formBuilder.group({
				email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
			});

			this.signupForm = formBuilder.group({
				password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
			});
	}

	nextSlide(): void {
		this.slides.slideNext();
	}

	getInvitation(): void {
		console.info('IntroPage.getInvitation()');

		const loading = this.loadingCtrl.create();

		if (!this.getInvitationForm.valid){
			console.info('IntroPage.getInvitation(), данные формы некорректны');
			console.log(this.getInvitationForm.value);
		} else {
			this.authProvider.getTeamInvite(this.getInvitationForm.value.email)
				.then(inviteSnapshot => {
					console.info('IntroPage.getInvitation().then(), inviteSnapshot:');
					console.info(inviteSnapshot);

					if (inviteSnapshot){
						console.info('IntroPage.getInvitation(), email найден');
						this.invitation = inviteSnapshot[0];
					} else {
						console.log("IntroPage.getInvitation(), такой email не найден");
					}
					
					loading.dismiss().then( () => { 
						console.log("IntroPage.getInvitation(), сокрытие круилки, следующий слайд...");
						this.nextSlide(); 
					});
			}).catch(e => {
				console.info('IntroPage.getInvitation(), ERROR:');
				console.info(e);
			});
		}

		loading.present();
	}


	signupTeamMember(): void {
		console.info('IntroPage.signupTeamMember()');

		const loading = this.loadingCtrl.create();
		
		if (!this.signupForm.valid){
			console.log(this.signupForm.value);
		} else {
			console.info('IntroPage.signupTeamMember(), отправляю данные');
			
			this.authProvider.createMemberAccount(
				this.invitation.email, 
				this.signupForm.value.password, 
				this.invitation.teamId, 
				this.invitation.fullName, 
				this.invitation.teamName, 
				this.invitation.inviteId
			).then( () => {
					console.info('IntroPage.signupTeamMember(), данные приняты:');
					
					loading.dismiss().then( () => {
						console.info('IntroPage.signupTeamMember(), следующий слайд...');
						this.nextSlide();
					});
			}).catch(error => {
				console.info('IntroPage.signupTeamMember(), ОШИБКА:');
				console.info(error);
			});
		}

		loading.present();
	}

}