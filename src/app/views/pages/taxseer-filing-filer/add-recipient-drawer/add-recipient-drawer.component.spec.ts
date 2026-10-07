import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipientDrawerComponent } from './add-recipient-drawer.component';

describe('AddRecipientDrawerComponent', () => {
  let component: AddRecipientDrawerComponent;
  let fixture: ComponentFixture<AddRecipientDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipientDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipientDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
