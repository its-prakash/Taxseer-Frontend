import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFilersComponent } from './dashboard-filers.component';

describe('DashboardFilersComponent', () => {
  let component: DashboardFilersComponent;
  let fixture: ComponentFixture<DashboardFilersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFilersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFilersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
