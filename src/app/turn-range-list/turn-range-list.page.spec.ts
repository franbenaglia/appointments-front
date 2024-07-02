import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnRangeListPage } from './turn-range-list.page';

describe('TurnRangeListPage', () => {
  let component: TurnRangeListPage;
  let fixture: ComponentFixture<TurnRangeListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnRangeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
