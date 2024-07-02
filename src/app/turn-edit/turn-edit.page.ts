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

//const eventName: string = 'testavailable';

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
  selectedDays: string[] = []; //['2024-06-19', '2024-06-03']
  selectedHours: string[] = [];

  dayValues: number[];
  minDate: string;
  maxDate: string;

  hourValues: number[];
  minuteValues: number[];

  timeFree: string[] = [];

  theevent: string;

  isDateEnabled = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return this.dateAvailable(dateString) && this.enableDate && utcDay !== 0 && utcDay !== 6;
  };

  settimevalues($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {

  }

  dateAvailable(dateString: string): Boolean {
    return !this.selectedDays.includes(dateString);
  }

  ngOnInit() {

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

        this.selectedDays.push(...av.datesUsed.map(s => s && s.substring(0, 10)));
      });
    })

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

    t.event = 'testavailable';

    let sdate = this.form.controls['date'].value;
    let stime = this.form.controls['time'].value;
    let lg: number = stime.length;
    stime = lg === 4 ? '0' + stime : stime;
    let stimedate = sdate.substring(0, 10) + 'T' + stime + ':00';

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

  load() {
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone
    });
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
    console.log('evento ioncance');
    this.showTime = false;
    this.enableDate = true;
  }

  private mapToFormData(form: FormGroup): FormData {

    let input = new FormData();
    //input.append('id', !form.get('id') ? form.get('id').value : null);
    input.append('firstname', form.get('firstname')!.value);
    input.append('lastname', form.get('lastname')!.value);
    input.append('email', form.get('email')!.value);
    input.append('phone', form.get('telephone')!.value);
    input.append('date', form.get('date')!.value);
    input.append('time', form.get('time')!.value);

    return input;
  }

}
