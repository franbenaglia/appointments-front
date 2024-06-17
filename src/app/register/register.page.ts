import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader, IonToast, IonText } from '@ionic/angular/standalone';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../validators/confirmPasswordValidator';

const interval: number = 4500;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonText, IonToast, IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  public form = new FormGroup({
    id: new FormControl(),
    "firstName": new FormControl("", Validators.required),
    "lastName": new FormControl("", Validators.required),
    "email": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
    "passwordb": new FormControl("", Validators.required),
    "phone": new FormControl("")
  },{ validators: ConfirmPasswordValidator.MatchPassword});

  isToastOpen = false;
  interval = interval;
  message = '';


  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  onSubmit() {

    console.log(this.form);

    let u: User = Object.assign(new User(), this.form.value);

    this.authService.registerUser(u).subscribe(u => {
      this.setOpen(true);
      this.message = 'Success! Registration accepted.';
      let timerId =  setInterval(() => {
        clearInterval(timerId);
        this.router.navigate((['login']));
      }, interval);
    },
      error => {
        this.setOpen(true);
        this.message = 'Submit fail';
        console.log(error);
      });

  }


}
