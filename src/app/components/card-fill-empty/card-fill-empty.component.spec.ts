import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFillEmptyComponent } from './card-fill-empty.component';

describe('CardFillEmptyComponent', () => {
  let component: CardFillEmptyComponent;
  let fixture: ComponentFixture<CardFillEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFillEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFillEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
