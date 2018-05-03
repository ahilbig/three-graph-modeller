import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormComponentComponent } from './modal-form-component.component';

describe('ModalFormComponentComponent', () => {
  let component: ModalFormComponentComponent;
  let fixture: ComponentFixture<ModalFormComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
