import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonNote, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, Platform, IonItem, IonIcon } from '@ionic/angular/standalone';
import { TurnsService } from '../services/turns.service';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { Turn } from '../model/turn';

@Component({
  selector: 'app-turn-detail',
  templateUrl: './turn-detail.page.html',
  styleUrls: ['./turn-detail.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonNote]
})
export class TurnDetailPage implements OnInit {

  //public message!: Message;
  public turn!: Turn;
  private data = inject(TurnsService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {
    addIcons({ personCircle });
  }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('_id') as string;

    this.data.getTurnById(id).subscribe(turn => {

      this.turn = turn;

    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

}
