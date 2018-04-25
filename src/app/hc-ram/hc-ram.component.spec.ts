import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcRamComponent } from './hc-ram.component';
import { FormsModule } from '@angular/forms';

describe('HcRamComponent', () => {
  let component: HcRamComponent;
  let fixture: ComponentFixture<HcRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
