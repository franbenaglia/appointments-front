import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Turn } from '../model/turn';
import { environment } from 'src/environments/environment';
import { GetResult, Preferences } from '@capacitor/preferences';
import { UserService } from './user.service';

type ApiResponse = { page: number, per_page: number, total: number, total_pages: number, results: Turn[] }

@Injectable({
  providedIn: 'root'
})
export class TurnsService {

  //TODO capacitor httpclent plugin?
  httpClient = inject(HttpClient);
  userService = inject(UserService);

  urlresourceserver: string = environment.resourceserver;

  baseURL: string = this.urlresourceserver + "/turn/";

  token: string;

  constructor() {
    from(this.userService.getTokenJwt()).subscribe(t => {
      this.token = t.value;
    });
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
