import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnEditPage } from './turn-edit.page';

describe('TurnEditPage', () => {
  let component: TurnEditPage;
  let fixture: ComponentFixture<TurnEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
