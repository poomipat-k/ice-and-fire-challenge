import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHouseComponent } from './details-house.component';

describe('DetailsHouseComponent', () => {
  let component: DetailsHouseComponent;
  let fixture: ComponentFixture<DetailsHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
