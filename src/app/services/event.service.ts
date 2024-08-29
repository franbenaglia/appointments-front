import { Injectable } from '@angular/core';
import { TurnsService } from './turns.service';
import { AvailableRangeTurns } from '../model/availablerangeturns';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private turnsService: TurnsService) {
    this.turnsService.getAvailableRangeTurns().subscribe(es => {
      this.setEvents(es);
    });

  }

  private event: Array<AvailableRangeTurns> = [];

  setEvents(events: Array<AvailableRangeTurns>) {
    this.event.push(...events);
  }

  addEvent(e: any) {
    this.event.push(e);
  }

  getEvents(): Array<AvailableRangeTurns> {
    return this.event;
  }


}
