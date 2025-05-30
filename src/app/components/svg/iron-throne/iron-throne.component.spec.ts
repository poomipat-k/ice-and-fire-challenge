import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IronThroneComponent } from './iron-throne.component';

describe('IronThroneComponent', () => {
  let component: IronThroneComponent;
  let fixture: ComponentFixture<IronThroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IronThroneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IronThroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
