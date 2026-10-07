import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerFormStatusComponent } from './filer-form-status.component';

describe('FilerFormStatusComponent', () => {
  let component: FilerFormStatusComponent;
  let fixture: ComponentFixture<FilerFormStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilerFormStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilerFormStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
