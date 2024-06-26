import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader, IonToast } from '@ionic/angular/standalone';
import { Turn } from '../model/turn';
import { TurnsService } from '../services/turns.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-turn-edit',
  templateUrl: './turn-edit.page.html',
  styleUrls: ['./turn-edit.page.scss'],
  standalone: true,
  imports: [IonToast, IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TurnEditPage implements OnInit {

  @ViewChild('datetime', { static: false }) datetime: any;

  constructor(private turnsService: TurnsService, private userService: UserService) { }

  user: User;
  message: string = '';
  currentDate: any;

  dayValues: number[];
  hourValues: number[];
  minuteValues: number[];
  minDate: string;
  maxDate: string;

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.load();
    }
    );

    this.turnsService.getAvailableTurns('firstEvent').subscribe(av => {
      this.dayValues = av[0].dayValues;
      this.hourValues = av[0].hourValues;
      this.minuteValues = av[0].minuteValues;
      this.minDate = av[0].minDate;
      this.maxDate = av[0].maxDate;
    });
  }

  ngAfterViewInit() {
    //this.datetime.
    this.currentDate = new Date().toISOString();
  }

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
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

    let t: Turn = Object.assign(new Turn(), this.form.value);
    t.user = this.user;

    this.turnsService.addTurn(t).subscribe(t => {
      this.message = 'Success! Turn accepted.';
      this.setOpen(true);
    },
      error => {
        this.setOpen(true);
        this.message = 'Submit fail';
        console.log(error);

      }


    );
  }

  load() {
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone
    });
  }

  cancel() {
    console.log('cancel');
    //datetime.cancel();
  }

  confirm() {
    console.log('confirm');
    //datetime.confirm();
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
