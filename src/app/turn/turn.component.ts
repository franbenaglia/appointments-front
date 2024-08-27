import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chevronForward } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { Platform, IonItem, IonLabel, IonNote, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Turn } from '../model/turn';
import { TurnsService } from '../services/turns.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Email } from '../model/email';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, RouterLink, IonItem, IonLabel, IonNote, IonIcon],
})
export class TurnComponent implements OnInit {

  private platform = inject(Platform);
  private data = inject(TurnsService);
  //@Input() message!: Message;
  @Input() turn!: Turn;

  user: User;
  cancelVisible: boolean = true;

  isIos() {
    return this.platform.is('ios')
  }

  constructor(private emailService: EmailService, private userService: UserService) {
    addIcons({ chevronForward });
  }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
      this.user = user;
    }
    );

    if (this.turn && (this.turn.cancelAdmin || this.turn.cancelUser)) {
      this.cancelVisible = false;
    }

  }

  cancel() {
    if (this.user.role === 'admin') {
      this.turn.cancelAdmin = true;
    } else {
      this.turn.cancelUser = true;
    }
    this.data.updateTurn(this.turn).subscribe(t => {

      if (this.user.role === 'user') {

        const email: Email = {
          to: this.user.email,
          text: 'Mr/Ms ' + this.user.firstName + ' ' + this.user.lastName + 'your turn has been cancelled',
          subject: 'Turn cancelled'
        };

        this.emailService.sendEmail(email).subscribe(x =>
          console.log('email sended')
        );

      }

      console.log(t);
    }
    );
  }

}
