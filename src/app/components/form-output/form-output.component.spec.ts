import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOutputComponent } from './form-output.component';

describe('FormOutputComponent', () => {
  let component: FormOutputComponent;
  let fixture: ComponentFixture<FormOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
