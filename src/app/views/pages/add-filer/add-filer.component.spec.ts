import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilerComponent } from './add-filer.component';

describe('AddFilerComponent', () => {
  let component: AddFilerComponent;
  let fixture: ComponentFixture<AddFilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
