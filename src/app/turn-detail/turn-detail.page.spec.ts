import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnDetailPage } from './turn-detail.page';

describe('TurnDetailPage', () => {
  let component: TurnDetailPage;
  let fixture: ComponentFixture<TurnDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
