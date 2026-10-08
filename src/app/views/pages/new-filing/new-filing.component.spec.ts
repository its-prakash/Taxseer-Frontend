import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilingComponent } from './new-filing.component';

describe('NewFilingComponent', () => {
  let component: NewFilingComponent;
  let fixture: ComponentFixture<NewFilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFilingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
