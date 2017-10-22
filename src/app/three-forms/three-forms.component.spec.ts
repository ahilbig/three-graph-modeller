import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeFormsComponent } from './three-forms.component';

describe('ThreeFormsComponent', () => {
  let component: ThreeFormsComponent;
  let fixture: ComponentFixture<ThreeFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
