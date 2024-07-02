import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader, IonToast, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { TurnsService } from '../services/turns.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { AvailableRangeTurns } from '../model/availablerangeturns';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-turn-range',
  templateUrl: './turn-range.page.html',
  styleUrls: ['./turn-range.page.scss'],
  standalone: true,
  imports: [IonRadio, IonRadioGroup, IonToast, IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TurnRangePage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  constructor(private fb: FormBuilder, private turnsService: TurnsService, private userService: UserService) { }

  user: User;
  message: string = '';
  currentDate: any;
  dates: string[] = [];
  minDate: string;
  maxDate: string;
  weekends: any = true;
  dayValues: number[] = [];
  hourValues: number[] = [];
  minuteValues: number[] = [];
  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  minutes: number[] = [0, 15, 30, 45];

  art!: AvailableRangeTurns;

  @ViewChild(IonDatetime) datetime: IonDatetime;

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('_id') as string;

    if (id) {
      this.turnsService.getAvailableRangeTurnById(id).subscribe(avt => {
        this.art = avt;
        this.load();
      });
    }
  }

  load() {
    this.form.patchValue({
      eventName: this.art[0].event,
      weekends: this.art[0].weekends,
      daysincluded: this.art[0].dayValues,
      hoursincluded: this.art[0].hourValues,
      minutesincluded: this.art[0].minuteValues,
    });
  }

  ngAfterViewInit() {
    this.currentDate = new Date().toISOString();
  }

  isToastOpen = false;

  setspecifics(ds: string | string[]) {
    this.dates = ds as any;
    console.log(this.dates);
  }

  setmin(ds: string | string[]) {
    this.minDate = ds as any;
  }

  setmax(ds: string | string[]) {
    this.maxDate = ds as any;
  }

  setweekend(ds: any) {
    this.weekends = ds.detail.value;
  }

  setdayvalues(ds: any) {
    this.dayValues = ds.detail.value;
  }

  sethourvalues(ds: any) {
    this.hourValues = ds.detail.value;
  }

  setminutevalues(ds: any) {
    this.minuteValues = ds.detail.value;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


  public form = this.fb.group({
    id: new FormControl(),
    "eventName": new FormControl("", Validators.required),
    "weekends": new FormControl("", Validators.required),
    "daysincluded": new FormControl("", Validators.required),
    "hoursincluded": new FormControl("", Validators.required),
    "minutesincluded": new FormControl("", Validators.required),
    //"dates": this.fb.array([{}])
  })


  onSubmit() {

    let t: AvailableRangeTurns = Object.assign(new AvailableRangeTurns(), this.form.value);
    t.specificdays.push(... this.dates);
    t.minDate = this.minDate;
    t.maxDate = this.maxDate;
    t.weekends = this.weekends;
    t.dayValues = this.dayValues;
    t.hourValues = this.hourValues;
    t.minuteValues = this.minuteValues;

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

}
