import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnsListPage } from './turns-list.page';

describe('TurnsListPage', () => {
  let component: TurnsListPage;
  let fixture: ComponentFixture<TurnsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
