import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilersComponent } from './filers.component';

describe('FilersComponent', () => {
  let component: FilersComponent;
  let fixture: ComponentFixture<FilersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
