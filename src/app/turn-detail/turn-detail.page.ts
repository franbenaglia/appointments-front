import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonNote, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, Platform, IonItem, IonIcon, IonButton } from '@ionic/angular/standalone';
import { TurnsService } from '../services/turns.service';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { Turn } from '../model/turn';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { EmailService } from '../services/email.service';
import { Email } from '../model/email';
import { PaymentComponent } from "../components/payment/payment.component";

@Component({
  selector: 'app-turn-detail',
  templateUrl: './turn-detail.page.html',
  styleUrls: ['./turn-detail.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonItem, IonMenuButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonNote, PaymentComponent]
})
export class TurnDetailPage implements OnInit {

  //public message!: Message;
  public turn!: Turn;
  private data = inject(TurnsService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  cancelDisabled: boolean = false;

  constructor(private emailService: EmailService, private userService: UserService) {
    addIcons({ personCircle });
  }

  user: User;

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('_id') as string;

    this.data.getTurnById(id).subscribe(turn => {
      this.turn = turn;
      if (turn.cancelAdmin || turn.cancelUser) {
        this.cancelDisabled = true;
      }
    });

    this.userService.getUser().subscribe(user => {
      this.user = user;
    }
    );
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  cancel() {
    if (this.user.role === 'admin') {
      this.turn.cancelAdmin = true;
    } else {
      this.turn.cancelUser = true;
    }
    this.data.updateTurn(this.turn).subscribe(t => {

      this.cancelDisabled = true;

      if (this.user.role === 'admin') {

        const email: Email = {
          to: this.turn.user.email,
          text: 'Mr/Ms ' + this.turn.user.firstName + ' ' + this.turn.user.lastName + ' your turn has been cancelled',
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
