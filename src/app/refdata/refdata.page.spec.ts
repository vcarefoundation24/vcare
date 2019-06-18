import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefdataPage } from './refdata.page';

describe('RefdataPage', () => {
  let component: RefdataPage;
  let fixture: ComponentFixture<RefdataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefdataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefdataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
