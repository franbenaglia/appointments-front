import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StripeService {

  urlresourceserver: string = environment.resourceserver;

  constructor(private http: HttpClient) { }

  charge(amount: number, tokenId: string) {

    return this.http.post<any>(this.urlresourceserver + "/payment/stripe_checkout", {
      stripeToken: tokenId,
      amount: amount
    });

  }

}
