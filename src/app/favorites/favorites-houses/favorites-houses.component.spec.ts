import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesHousesComponent } from './favorites-houses.component';

describe('FavoritesHousesComponent', () => {
  let component: FavoritesHousesComponent;
  let fixture: ComponentFixture<FavoritesHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesHousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
