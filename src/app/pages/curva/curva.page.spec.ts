import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvaPage } from './curva.page';

describe('CurvaPage', () => {
  let component: CurvaPage;
  let fixture: ComponentFixture<CurvaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurvaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
