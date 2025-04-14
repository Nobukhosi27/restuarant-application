import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageRestuarantsPage } from './manage-restuarants.page';

describe('ManageRestuarantsPage', () => {
  let component: ManageRestuarantsPage;
  let fixture: ComponentFixture<ManageRestuarantsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestuarantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
