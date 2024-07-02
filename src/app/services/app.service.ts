import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  private hiddenMenu: BehaviorSubject<boolean> = new BehaviorSubject(null);

  private theevent: BehaviorSubject<string> = new BehaviorSubject(null);

  getTheEvent(): Observable<string> {
    return this.theevent.asObservable();
  }

  setTheEvent(event: string) {
    this.theevent.next(event);
  }

  getHiddenMenu(): Observable<boolean> {
    return this.hiddenMenu.asObservable();
  }

  setHiddenMenu(hiddenMenu: boolean) {
    this.hiddenMenu.next(hiddenMenu);
  }

}
