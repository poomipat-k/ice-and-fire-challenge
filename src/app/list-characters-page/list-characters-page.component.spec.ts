import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCharactersPageComponent } from './list-characters-page.component';

describe('ListCharactersPageComponent', () => {
  let component: ListCharactersPageComponent;
  let fixture: ComponentFixture<ListCharactersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCharactersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCharactersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
