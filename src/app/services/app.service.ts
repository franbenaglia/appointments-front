import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  // signals are ok too
  //https://v17.angular.io/guide/signals

  private hiddenMenu: BehaviorSubject<boolean> = new BehaviorSubject(null);

  private theevent: BehaviorSubject<string> = new BehaviorSubject(null);

  /*
  private hiddenMenux: WritableSignal<boolean> = signal(false);

  getHiddenMenux() {
    return this.hiddenMenux();
  }

  setHiddenMenux(hiddenMenu: boolean) {
    this.hiddenMenux.set(hiddenMenu);
  }

  */

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
