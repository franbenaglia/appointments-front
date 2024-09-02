import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonItem, IonIcon, IonNote, IonLabel, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonDatetime, IonDatetimeButton, IonModal, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonCheckbox, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonLoading, IonList, IonToggle, IonListHeader, IonToast, SelectChangeEventDetail } from '@ionic/angular/standalone';
import { Turn } from '../model/turn';
import { TurnsService } from '../services/turns.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { IonSelectCustomEvent } from '@ionic/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-turn-edit',
  templateUrl: './turn-edit.page.html',
  styleUrls: ['./turn-edit.page.scss'],
  standalone: true,
  imports: [IonToast, IonListHeader, IonToggle, IonSelect, IonSelectOption, IonList, IonLoading, IonTextarea, IonInput, IonCol, IonRow, IonGrid, IonCheckbox, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonItem, IonIcon, IonNote, IonLabel, IonModal, IonDatetimeButton, IonDatetime, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TurnEditPage implements OnInit {

  @ViewChild('datetime', { static: false }) datetime: any;

  constructor(private appService: AppService, private turnsService: TurnsService, private userService: UserService) { }

  user: User;
  message: string = '';
  currentDate: any;
  currentTime: any;
  showTime: Boolean = false;
  enableDate: boolean = true;
  selectedDays: string[] = [];
  invalidDays: string[] = [];
  selectedHours: string[] = [];

  dayValues: number[];
  minDate: string;
  maxDate: string;
  specificdays: string[] = [];

  weekends: Boolean = true;

  hourValues: number[];
  minuteValues: number[];

  timeFree: string[] = [];

  theevent: string;

  events: string[] = [];

  isDateEnabled = (dateString: string) => {
    return this.enableDate && this.dateAvailable(dateString) && this.invalidDate(dateString) &&
      this.weekendsf(dateString);
  };

  settimevalues($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {

  }

  dateAvailable(dateString: string): Boolean {
    return !this.selectedDays.includes(dateString);
  }

  invalidDate(dateString: string): Boolean {
    return !this.invalidDays.includes(dateString);
  }

  weekendsf(dateString: string): boolean {
    if (!this.weekends) return true;
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6
  }

  ngOnInit() {

    this.turnsService.getAllEvents().subscribe(events => {
      this.events.push(...events);
    });

    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.load();
    }
    );

    this.appService.getTheEvent().subscribe(e => {

      this.theevent = e;

      this.turnsService.getAvailableTurnsWithSelectedDates(this.theevent).subscribe(av => {
        this.dayValues = av.range[0].dayValues;
        this.minDate = av.range[0].minDate;
        this.maxDate = av.range[0].maxDate;
        this.hourValues = av.range[0].hourValues;
        this.minuteValues = av.range[0].minuteValues;
        this.weekends = av.range[0].weekends;
        this.specificdays = av.range[0].specificdays;
        this.selectedDays.push(...av.datesUsed.map(s => s && s.substring(0, 10)));
        this.addSpecificDays();
      });
    })

  }


  private addSpecificDays() {

    let days: number[] = this.specificdays.map(s => Math.abs(+s.substring(7)))
    this.dayValues.push(...days);
    this.excludingDays(days); //workaround

  }

  private excludingDays(days: number[]) {

    let lowEnd: number = +this.minDate.substring(5, 7);
    let highEnd: number = +this.maxDate.substring(5, 7);
    let months: number[] = [];
    let year: number = 2024;
    let allDates: string[] = [];

    for (let i = lowEnd; i <= highEnd; i++) {
      months.push(i);
    }

    for (let m of months) {
      for (let d of days) {
        let month = m.toString().length > 1 ? m.toString() : '0' + m.toString();
        let day = d.toString().length > 1 ? d.toString() : '0' + d.toString();
        allDates.push(year.toString() + '-' + month + '-' + day);
      }
    }
    this.cutSpecificDays(allDates);
  }

  private cutSpecificDays(allDates: string[]) {
    let notValidDates: string[] = allDates.filter(d => {
      return this.specificdays.indexOf(d) === -1;
    });

    this.invalidDays.push(...notValidDates);

  }

  setEvent($event: any) {
    this.appService.setTheEvent($event.detail.value);
    this.theevent = $event.detail.value;
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
    "firstName": new FormControl("", Validators.required),
    "lastName": new FormControl("", Validators.required),
    "email": new FormControl("", Validators.required),
    "phone": new FormControl("", Validators.required),
    "date": new FormControl("", Validators.required),
    "time": new FormControl("", Validators.required),
  });

  onSubmit() {

    let t: Turn = Object.assign(new Turn(), this.form.value);

    t.user = this.user;

    t.event = this.theevent;

    let sdate = this.form.controls['date'].value;
    let stime = this.form.controls['time'].value;

    let stimedate = this.convertDateTime(sdate, stime);

    t.date = new Date(stimedate);

    this.turnsService.addTurn(t).subscribe(t => {
      this.message = 'Success! Turn accepted.';
      this.setOpen(true);
      this.form.reset();
    },
      error => {
        this.setOpen(true);
        this.message = 'Submit fail';
        console.log(error);

      }


    );
  }

  private convertDateTime(sdate: string, stime: string): string {
    
    let doubledots: number = stime.indexOf(':');
    stime = stime.substring(doubledots + 1) === '0' ? stime + '0' : stime;
    let lg: number = stime.length;
    stime = lg === 4 ? '0' + stime : stime;

    return sdate.substring(0, 10) + 'T' + stime + ':00';
  }

  load() {
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone
    });
  }

  selectEvent() {

  }

  handleChange() {

    let sdate: string = this.form.controls['date'].value;

    this.turnsService.getAvailableTurnsTimes(this.theevent, sdate).subscribe(av => {
      this.hourValues = av.range[0].hourValues;
      this.minuteValues = av.range[0].minuteValues;
      this.timeFree = av.timeFree;
      this.showTime = true;
      this.enableDate = false;
    });
  }

  handleCancel() {
    this.showTime = false;
    this.enableDate = true;
  }

}
