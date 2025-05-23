import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookPageComponent } from './list-book-page.component';

describe('ListBookPageComponent', () => {
  let component: ListBookPageComponent;
  let fixture: ComponentFixture<ListBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBookPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
