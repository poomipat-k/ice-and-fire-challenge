import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBookComponent } from './card-book.component';

describe('CardBookComponent', () => {
  let component: CardBookComponent;
  let fixture: ComponentFixture<CardBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
