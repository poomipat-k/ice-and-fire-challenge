import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHousePageComponent } from './list-house-page.component';

describe('ListHousePageComponent', () => {
  let component: ListHousePageComponent;
  let fixture: ComponentFixture<ListHousePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHousePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHousePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
