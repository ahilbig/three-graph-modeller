import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphModelComponent } from './graph-model.component';

describe('GraphModelComponent', () => {
  let component: GraphModelComponent;
  let fixture: ComponentFixture<GraphModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
