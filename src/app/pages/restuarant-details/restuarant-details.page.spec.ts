import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestuarantDetailsPage } from './restuarant-details.page';

describe('RestuarantDetailsPage', () => {
  let component: RestuarantDetailsPage;
  let fixture: ComponentFixture<RestuarantDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
