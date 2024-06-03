import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader } from '@ionic/angular/standalone';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public form = new FormGroup({
    id: new FormControl(),
    "firstName": new FormControl("", Validators.required),
    "lastName": new FormControl("", Validators.required),
    "email": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
  });

  onSubmit() {
    
    console.log(this.form);
    
    let u: User = Object.assign(new User(), this.form.value);

    this.userService.registerUser(u).subscribe(u => {
      console.log(u);
    });
    
  }


}
