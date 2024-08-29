import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Turn } from '../model/turn';
import { environment } from 'src/environments/environment';
import { GetResult, Preferences } from '@capacitor/preferences';
import { AuthService } from './auth.service';
import { AvailableRangeTurns } from '../model/availablerangeturns';
import { AvailableDates } from '../model/availabledates';

type ApiResponse = { page: number, per_page: number, total: number, total_pages: number, results: Turn[] }

@Injectable({
  providedIn: 'root'
})
export class TurnsService {

  //TODO capacitor httpclent plugin?
  httpClient = inject(HttpClient);
  authService = inject(AuthService);

  urlresourceserver: string = environment.resourceserver;

  baseURL: string = this.urlresourceserver + "/turn/";

  token: string;

  constructor() {

    from(this.authService.getTokenJwt()).subscribe(t => {

      this.token = t.value;

      if (!this.token) {
        from(this.authService.getOGoogleJwtToken()).subscribe(x => {
          this.token = x.value;
        });
      }
    });

  }

  getAllEvents(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseURL + 'allEvents');
  }

  getAvailableRangeTurnById(id: string): Observable<AvailableRangeTurns> {
    return this.httpClient.get<AvailableRangeTurns>(this.baseURL + 'availableRangeById/' + id);
  }

  getAvailableRangeTurns(): Observable<AvailableRangeTurns[]> {
    return this.httpClient.get<AvailableRangeTurns[]>(this.baseURL + 'availableRange');
  }

  getAvailableTurns(event: String): Observable<AvailableRangeTurns> {
    return this.httpClient.get<AvailableRangeTurns>(this.baseURL + 'availableRange/' + event);
  }

  getAvailableTurnsWithSelectedDates(event: String): Observable<AvailableDates> {
    return this.httpClient.get<AvailableDates>(this.baseURL + 'availableDates/' + event);
  }

  getAvailableTurnsTimes(event: String, date: String): Observable<AvailableDates> {
    return this.httpClient.get<AvailableDates>(this.baseURL + 'availableTimesDates/' + event + '/' + date);
  }


  createOrUpdateAvailableTurns(rangeTurn: AvailableRangeTurns): Observable<any> {
    if (!rangeTurn._id) {
      return this.createAvailableTurns(rangeTurn);
    }
    return this.updateAvailableTurns(rangeTurn);
  }

  private createAvailableTurns(rangeTurn: AvailableRangeTurns): Observable<any> {

    const body = JSON.stringify(rangeTurn);

    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', '*')
      .append('Access-Control-Allow-Methods', '*')
      .append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post<AvailableRangeTurns>(this.baseURL + 'availableRange',
      body, { headers: headers });
  }

  private updateAvailableTurns(rangeTurn: AvailableRangeTurns): Observable<AvailableRangeTurns> {

    const body = JSON.stringify(rangeTurn);

    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', '*')
      .append('Access-Control-Allow-Methods', '*')
      .append('Access-Control-Allow-Origin', '*');

    return this.httpClient.put<AvailableRangeTurns>(this.baseURL + 'availableRange/' + rangeTurn.event,
      body, { headers: headers });
  }

  getAll(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseURL);
  }

  getTurnById(id: string): Observable<Turn> {
    return this.httpClient.get<Turn>(this.baseURL + id,
      { headers: new HttpHeaders({ "Authorization": "Bearer " + this.token }) });
  }

  getPaginated(pageNumber: number, pageSize: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseURL + pageNumber + '/' + pageSize);
  }


  getPaginatedByUser(pageNumber: number, pageSize: number, email: string): Observable<ApiResponse> {

    return this.httpClient.get<ApiResponse>(this.baseURL + pageNumber + '/' + pageSize + '/' + email);

  }

  addTurn(turn: Turn): Observable<Turn> {

    const body = JSON.stringify(turn);

    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', '*')
      .append('Access-Control-Allow-Methods', '*')
      .append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post<Turn>(this.baseURL,
      body, { headers: headers });
  }

  updateTurn(turn: Turn): Observable<Turn> {

    const body = JSON.stringify(turn);

    let id: String = turn._id;

    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', '*')
      .append('Access-Control-Allow-Methods', '*')
      .append('Access-Control-Allow-Origin', '*');

    return this.httpClient.put<Turn>(this.baseURL + id, body,
      { headers: headers });
  }


  deleteTurn(id: string): Observable<Turn> {
    return this.httpClient.delete<Turn>(this.baseURL + id);
  }


}
