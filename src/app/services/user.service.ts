import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../model/user';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);

  urlresourceserver: string = environment.resourceserver;

  baseURL: string = this.urlresourceserver + "/api/v1/auth";

  token: string;

  constructor(private authService: AuthService) {

    from(this.authService.getTokenJwt()).subscribe(t => {

      this.token = t.value;

      if (!this.token) {
        from(this.authService.getOGoogleJwtToken()).subscribe(x => {
          this.token = x.value;
        });
      }
    });

  }

  getUsers(): Observable<any> {

    return this.httpClient.get<any>(this.urlresourceserver + '/user/');

  }

  getUser(): Observable<User> {

    return this.httpClient.get<any>(this.baseURL + '/profileWithJustToken',
      { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token }) });

  }
}
