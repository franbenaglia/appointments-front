import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/angular/standalone';
import { TurnsService } from '../services/turns.service';
import { AvailableRangeTurns } from '../model/availablerangeturns';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-turn-range-list',
  templateUrl: './turn-range-list.page.html',
  styleUrls: ['./turn-range-list.page.scss'],
  standalone: true,
  imports: [IonItem, RouterLink, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TurnRangeListPage implements OnInit {

  constructor() { }

  private turnService = inject(TurnsService);

  aturns: AvailableRangeTurns[] = [];

  ngOnInit() {

    this.turnService.getAvailableRangeTurns().subscribe(aturns => {
      this.aturns.push(...aturns);
    });

  }

}
