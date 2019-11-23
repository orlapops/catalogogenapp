import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallaPage } from './talla.page';

describe('TallaPage', () => {
  let component: TallaPage;
  let fixture: ComponentFixture<TallaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
