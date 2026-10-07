import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerFilingsComponent } from './filer-filings.component';

describe('FilerFilingsComponent', () => {
  let component: FilerFilingsComponent;
  let fixture: ComponentFixture<FilerFilingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilerFilingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilerFilingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
