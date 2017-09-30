import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphControlComponentComponent } from './graph-control-component.component';

describe('GraphControlComponentComponent', () => {
  let component: GraphControlComponentComponent;
  let fixture: ComponentFixture<GraphControlComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphControlComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphControlComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
