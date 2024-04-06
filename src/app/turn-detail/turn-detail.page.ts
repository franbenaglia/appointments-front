import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonNote, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, Platform, IonItem, IonIcon } from '@ionic/angular/standalone';
import { Message, TurnsService } from '../services/turns.service';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-turn-detail',
  templateUrl: './turn-detail.page.html',
  styleUrls: ['./turn-detail.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonNote]
})
export class TurnDetailPage implements OnInit {

  public message!: Message;
  private data = inject(TurnsService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {
    addIcons({ personCircle });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.message = this.data.getMessageById(parseInt(id, 10));
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

}
