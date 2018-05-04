import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimRam8Component } from './sim-ram8.component';

describe('SimRam8Component', () => {
  let component: SimRam8Component;
  let fixture: ComponentFixture<SimRam8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimRam8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimRam8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
