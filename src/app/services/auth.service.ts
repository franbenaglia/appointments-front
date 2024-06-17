import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { Preferences } from '@capacitor/preferences';
import { CookieService } from 'ngx-cookie-service';

const headers: HttpHeaders = new HttpHeaders()
  .append('Content-Type', 'application/json')
  .append('Access-Control-Allow-Headers', '*')
  .append('Access-Control-Allow-Methods', '*')
  .append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);

  cookieService = inject(CookieService);

  urlresourceserver: string = environment.resourceserver;

  baseURL: string = this.urlresourceserver + "/api/v1/auth";

  constructor() { }

  registerUser(user: User): Observable<any> {

    const body = JSON.stringify(user);

    return this.httpClient.post<any>(this.baseURL + '/register',
      body, { headers: headers });
  }

  login(user: User): Observable<any> {

    const body = JSON.stringify(user);

    return this.httpClient.post<any>(this.baseURL + '/login',
      body, { headers: headers });
  }

  logout(): void {
    this.removeGoogleJwtToken();
    this.removeTokenJwt();
    this.removeGoogleJwtTokenCookie();
  }
  removeGoogleJwtTokenCookie() {
    this.cookieService.delete('googleJwtToken');
  }

  removeTokenJwt = async () => {
    return Preferences.remove({ key: 'tokenJwt' });
  };

  getTokenJwt = async () => {
    return Preferences.get({ key: 'tokenJwt' });
  };

  setTokenJwt = async (token: string) => {
    await Preferences.set({
      key: 'tokenJwt',
      value: token,
    });
  };

  removeGoogleJwtToken = async () => {
    return Preferences.remove({ key: 'googleJwtToken' });
  };

  getOGoogleJwtToken = async () => {
    return Preferences.get({ key: 'googleJwtToken' });
  };

  setGoogleJwtToken = async (flag: string) => {
    await Preferences.set({
      key: 'googleJwtToken',
      value: flag,
    });
  };

  async isLoggedIn(): Promise<boolean> {
    if ((await this.getTokenJwt()).value || (await this.getOGoogleJwtToken()).value) {
      return true;
    } else {
      return false;
    }
  }

  googleOauth2Login(): void {
    window.open(this.urlresourceserver + "/googleoauth2/google", "_self");
  }

  githubOauth2Login(): void {
    window.open(this.urlresourceserver + "/googleoauth2/github", "_self");
  }

}
