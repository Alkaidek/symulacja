import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimRamComponent } from './sim-ram.component';

describe('SimRamComponent', () => {
  let component: SimRamComponent;
  let fixture: ComponentFixture<SimRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
