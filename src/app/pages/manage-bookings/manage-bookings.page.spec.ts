import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageBookingsPage } from './manage-bookings.page';

describe('ManageBookingsPage', () => {
  let component: ManageBookingsPage;
  let fixture: ComponentFixture<ManageBookingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
