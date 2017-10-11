import {HostListener} from "@angular/core";
import {CircleAutoGraphRenderer} from "../graph-renderer/three-graph-renderer";

export class ThreeInputManager {

  graphRenderer: CircleAutoGraphRenderer;

  constructor(graphRenderer: CircleAutoGraphRenderer) {
    this.graphRenderer = graphRenderer;
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    // do something meaningful with it
    console.log(`The user just pressed ${ev.key}!`);
  }

}
