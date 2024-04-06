import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnPage } from './turn.page';

describe('TurnPage', () => {
  let component: TurnPage;
  let fixture: ComponentFixture<TurnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
