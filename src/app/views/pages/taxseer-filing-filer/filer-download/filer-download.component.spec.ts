import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerDownloadComponent } from './filer-download.component';

describe('FilerDownloadComponent', () => {
  let component: FilerDownloadComponent;
  let fixture: ComponentFixture<FilerDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilerDownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilerDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
