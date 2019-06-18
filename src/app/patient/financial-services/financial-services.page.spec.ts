import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialServicesPage } from './financial-services.page';

describe('FinancialServicesPage', () => {
  let component: FinancialServicesPage;
  let fixture: ComponentFixture<FinancialServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
