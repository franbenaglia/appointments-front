import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader, IonToast } from '@ionic/angular/standalone';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { logoGithub, logoGoogle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonToast, IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {


  constructor(private router: Router, private authService: AuthService) {
    addIcons({ logoGoogle, logoGithub });
  }

  urllocalserver: string = environment.localserver;

  showMessage: Boolean = false;

  ngOnInit() {
  }

  public form = new FormGroup({
    "email": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
  });

  onSubmit() {
    let u: User = Object.assign(new User(), this.form.value);

    this.authService.login(u).subscribe(
      u => {
        this.authService.setTokenJwt(u.accessToken);
        if (!Capacitor.isNativePlatform()) {
          window.location.assign(this.urllocalserver);
        } else {
          this.router.navigate((['folder/landingpage']));
        }
      }, e => {
        this.showMessage = true;
        console.log(e);
      });
  }

  setOpen(value: Boolean) {
    this.showMessage = value;
  }

  googleOauth2() {
    this.authService.googleOauth2Login();
  }

  githubOauth2() {
    this.authService.githubOauth2Login();
  }

  register() {
    this.router.navigate((['folder/register']));
  }

}