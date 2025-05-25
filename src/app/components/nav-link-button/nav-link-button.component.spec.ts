import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLinkButtonComponent } from './nav-link-button.component';

describe('NavLinkButtonComponent', () => {
  let component: NavLinkButtonComponent;
  let fixture: ComponentFixture<NavLinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLinkButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavLinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
