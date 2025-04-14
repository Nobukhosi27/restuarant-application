import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestuarantlistPage } from './restuarantlist.page';

describe('RestuarantlistPage', () => {
  let component: RestuarantlistPage;
  let fixture: ComponentFixture<RestuarantlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarantlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
