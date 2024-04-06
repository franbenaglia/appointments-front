import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../services/turns.service';
import { chevronForward } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { Platform, IonItem, IonLabel, IonNote, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonItem, IonLabel, IonNote, IonIcon],
})
export class TurnComponent implements OnInit {

  private platform = inject(Platform);
  @Input() message!: Message;
  isIos() {
    return this.platform.is('ios')
  }

  constructor() {
    addIcons({ chevronForward });
  }

  ngOnInit() { }

}
