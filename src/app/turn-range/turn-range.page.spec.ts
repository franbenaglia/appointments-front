import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnRangePage } from './turn-range.page';

describe('TurnRangePage', () => {
  let component: TurnRangePage;
  let fixture: ComponentFixture<TurnRangePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnRangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
