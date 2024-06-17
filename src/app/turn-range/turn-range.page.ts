import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader, IonToast } from '@ionic/angular/standalone';
import { Turn } from '../model/turn';
import { TurnsService } from '../services/turns.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { AvailableRangeTurns } from '../model/availablerangeturns';
@Component({
  selector: 'app-turn-range',
  templateUrl: './turn-range.page.html',
  styleUrls: ['./turn-range.page.scss'],
  standalone: true,
  imports: [IonToast, IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TurnRangePage implements OnInit {

  @ViewChild('datetime', { static: false }) datetime: any;

  constructor(private turnsService: TurnsService, private userService: UserService) { }

  user: User;
  message: string = '';
  currentDate: any;

  dayValues: number[] = [5, 10, 15, 16, 20, 25, 30];
  hourValues: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  minuteValues: number[] = [0, 30];
  minDate: string = "2024-06-01T09:00:00";
  maxDate: string = "2024-07-15T17:59:59";

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

  ngOnInit() {

    this.turnsService.getAvailableTurns('firstEvent').subscribe(av => {
      this.dayValues = av[0].dayValues;
      this.hourValues = av[0].hourValues;
      this.minuteValues = av[0].minuteValues;
      this.minDate = av[0].minDate;
      this.maxDate = av[0].maxDate;
    });
  }

  ngAfterViewInit() {
    this.currentDate = new Date().toISOString();
  }

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  public form = new FormGroup({
    id: new FormControl(),
    "eventName": new FormControl("", Validators.required),
    "date": new FormControl("", Validators.required),
  });

  onSubmit() {

    let t: AvailableRangeTurns = Object.assign(new AvailableRangeTurns(), this.form.value);

    this.turnsService.createAvailableTurns(t).subscribe(t => {
      this.message = 'Success! Range Turn accepted.';
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
     
    });
  }

 

 

}
