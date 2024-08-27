import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar } from '@ionic/angular/standalone';
import { TurnComponent } from '../turn/turn.component';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Turn } from '../model/turn';
import { TurnsService } from '../services/turns.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

const pageSize: number = 5;

@Component({
  selector: 'app-turns-list',
  templateUrl: './turns-list.page.html',
  styleUrls: ['./turns-list.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonInfiniteScrollContent, IonInfiniteScroll, TurnComponent, IonList, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TurnsListPage implements OnInit {

  constructor(private userService: UserService
  ) { }

  private data = inject(TurnsService);

  private turns: Turn[] = [];

  private ts: Turn[] = [];

  private pageNumber: number = 1;

  user: User = Object.assign(new User(), '');

  private mail: string = '';

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (user.role !== 'admin') {
        this.mail = user.email;
      }
      this.getNextTurns();
    })
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW');
  }

  getTurns(): Turn[] {
    return this.turns;
  }

  getNextTurns(): void {

    this.data.getPaginatedByUser(this.pageNumber, pageSize, this.mail).subscribe(
      data => {
        if (this.pageNumber === 1) {
          this.turns.length = 0;
        }
        this.turns.push(...data.results);
      }
    );
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.pageNumber++;
    this.getNextTurns();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 2500);
  }

  handleInput(event) {
    if (event.target.value) {
      const query = event.target.value.toLowerCase();
      this.mail = query;
      this.pageNumber = 1;
      this.getNextTurns();
    } else {
      this.getNextTurns();
    }
  }

  handleCancel(event) {
    this.pageNumber = 1;
    this.getNextTurns();
  }

}


