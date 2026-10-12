import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W9ManagmentComponent } from './w9-managment.component';

describe('W9ManagmentComponent', () => {
  let component: W9ManagmentComponent;
  let fixture: ComponentFixture<W9ManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [W9ManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W9ManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
