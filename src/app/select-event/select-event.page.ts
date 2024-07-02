import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, SelectChangeEventDetail } from '@ionic/angular/standalone';
import { TurnsService } from '../services/turns.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-select-event',
  templateUrl: './select-event.page.html',
  styleUrls: ['./select-event.page.scss'],
  standalone: true,
  imports: [IonSelect, IonSelectOption, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SelectEventPage implements OnInit {

  constructor(private appService: AppService, private turnsService: TurnsService) { }

  events: string[] = [];

  ngOnInit() {

    this.turnsService.getAllEvents().subscribe(events => {
      this.events.push(...events);
    });

  }

  setEvent($event: any) {
    this.appService.setTheEvent($event.detail.value);
  }

}
