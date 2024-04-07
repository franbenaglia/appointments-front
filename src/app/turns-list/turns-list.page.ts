import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { Message, Turn, TurnsService } from '../services/turns.service';
import { TurnComponent } from '../turn/turn.component';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

const pageSize: number = 5;

@Component({
  selector: 'app-turns-list',
  templateUrl: './turns-list.page.html',
  styleUrls: ['./turns-list.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, TurnComponent, IonList, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TurnsListPage implements OnInit {

  constructor() { }

  private data = inject(TurnsService);

  private turns: Turn[] = [];

  private pageNumber : number = 1;

  ngOnInit() {
    this.getNextTurns();
  }

  getTurns(): Turn[] {
    return this.turns;
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getNextTurns(): void {
    this.data.getPaginated(this.pageNumber, pageSize).subscribe(
      data => {
        this.turns.push(... data.results);
        console.log(this.turns);
      }
    );
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.pageNumber++;
    this.getNextTurns();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 6500);
  }

}


