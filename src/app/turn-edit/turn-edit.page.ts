import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader } from '@ionic/angular/standalone';
import { Turn } from '../model/turn';
import { TurnsService } from '../services/turns.service';

@Component({
  selector: 'app-turn-edit',
  templateUrl: './turn-edit.page.html',
  styleUrls: ['./turn-edit.page.scss'],
  standalone: true,
  imports: [IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TurnEditPage implements OnInit {

  constructor(private turnsService: TurnsService) { }

  ngOnInit() {
  }

  public form = new FormGroup({
    id: new FormControl(),
    "firstName": new FormControl("", Validators.required),
    "lastName": new FormControl("", Validators.required),
    "email": new FormControl("", Validators.required),
    "phone": new FormControl("", Validators.required),
    "date": new FormControl("", Validators.required),
  });

  onSubmit() {
    console.log(this.form);
    let t: Turn = Object.assign(new Turn(), this.form.value);
    this.turnsService.addTurn(t).subscribe(t => (console.log(t)));
  }

  private mapToFormData(form: FormGroup): FormData {

    let input = new FormData();
    //input.append('id', !form.get('id') ? form.get('id').value : null);
    input.append('firstname', form.get('firstname')!.value);
    input.append('lastname', form.get('lastname')!.value);
    input.append('email', form.get('email')!.value);
    input.append('phone', form.get('telephone')!.value);
    input.append('date', form.get('date')!.value);

    return input;
  }

}
