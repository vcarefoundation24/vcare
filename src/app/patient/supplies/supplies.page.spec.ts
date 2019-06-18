import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesPage } from './supplies.page';

describe('SuppliesPage', () => {
  let component: SuppliesPage;
  let fixture: ComponentFixture<SuppliesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
