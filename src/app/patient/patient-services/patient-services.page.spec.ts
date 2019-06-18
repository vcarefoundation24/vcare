import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientServicesPage } from './patient-services.page';

describe('PatientServicesPage', () => {
  let component: PatientServicesPage;
  let fixture: ComponentFixture<PatientServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
