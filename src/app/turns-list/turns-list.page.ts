import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList } from '@ionic/angular/standalone';
import { Message, TurnsService } from '../services/turns.service';
import { TurnComponent } from '../turn/turn.component';

@Component({
  selector: 'app-turns-list',
  templateUrl: './turns-list.page.html',
  styleUrls: ['./turns-list.page.scss'],
  standalone: true,
  imports: [TurnComponent, IonList, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TurnsListPage implements OnInit {

  constructor() { }

  private data = inject(TurnsService);

  ngOnInit() {
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

}
