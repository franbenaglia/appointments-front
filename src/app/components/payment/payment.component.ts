import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonToast } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [IonToast, IonButton, CommonModule]
})
export class PaymentComponent implements OnInit, AfterViewInit {

  constructor(private ngZone: NgZone, private stripeService: StripeService) { }

  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string;
  card: any;
  disabled: boolean = false;
  isToastOpen = false;
  message: string = '';

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  onChange({ error }) {
    if (error) {
      this.ngZone.run(() => {
        this.cardError = error.message;
        this.disabled = true;
      }
      );
    } else {
      this.ngZone.run(() => {
        this.cardError = null;
        this.disabled = false;
      });
    }
  }

  async getToken() {

    const { token, error } = await stripe.createToken(this.card)

    if (token) {
      console.log(token);
      this.stripeService.charge(100, token.id).subscribe(x => {
        this.message = 'Pay accepted!';
        this.setOpen(true);
        console.log(x);
        this.disabled = true;
      }
      );
    } else {
      console.log(error);
      this.message = error;
      this.setOpen(true);
      this.ngZone.run(() => this.cardError = error.message);
    }

  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
