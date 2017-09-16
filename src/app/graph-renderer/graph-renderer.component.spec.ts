import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRendererComponent } from './graph-renderer.component';

describe('GraphRendererComponent', () => {
  let component: GraphRendererComponent;
  let fixture: ComponentFixture<GraphRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
