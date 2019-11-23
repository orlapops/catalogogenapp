import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PorSubtipoPage } from './por-subtipopage';

describe('PorSubtipoPage', () => {
  let component: PorSubtipoPage;
  let fixture: ComponentFixture<PorSubtipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorSubtipoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorSubtipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
