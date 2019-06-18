import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellingPage } from './counselling.page';

describe('CounsellingPage', () => {
  let component: CounsellingPage;
  let fixture: ComponentFixture<CounsellingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
