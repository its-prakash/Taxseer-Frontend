import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerSummaryComponent } from './filer-summary.component';

describe('FilerSummaryComponent', () => {
  let component: FilerSummaryComponent;
  let fixture: ComponentFixture<FilerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilerSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
