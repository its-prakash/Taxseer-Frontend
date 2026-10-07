import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerRecipientComponent } from './filer-recipient.component';

describe('FilerRecipientComponent', () => {
  let component: FilerRecipientComponent;
  let fixture: ComponentFixture<FilerRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilerRecipientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilerRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
