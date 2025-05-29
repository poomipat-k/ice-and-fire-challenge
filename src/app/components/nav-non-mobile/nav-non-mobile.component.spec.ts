import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNonMobileComponent } from './nav-non-mobile.component';

describe('NavNonMobileComponent', () => {
  let component: NavNonMobileComponent;
  let fixture: ComponentFixture<NavNonMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavNonMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavNonMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
