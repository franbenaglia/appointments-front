import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../model/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  httpClient = inject(HttpClient);

  urlresourceserver: string = environment.resourceserver;

  sendEmail(email: Email): Observable<void> {

    const body = JSON.stringify(email);

    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', '*')
      .append('Access-Control-Allow-Methods', '*')
      .append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post<void>(this.urlresourceserver + '/email',
      body, { headers: headers });
  }

}
