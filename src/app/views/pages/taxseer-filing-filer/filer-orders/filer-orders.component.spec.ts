import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerOrdersComponent } from './filer-orders.component';

describe('FilerOrdersComponent', () => {
  let component: FilerOrdersComponent;
  let fixture: ComponentFixture<FilerOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilerOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
