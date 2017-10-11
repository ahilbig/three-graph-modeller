/*
  CREDITS
  -------

  The "input field" part of my code was inspired by the library threejs-input-fields from Fernando Villar Perez
  Although Fenando didn't provide a license information credits therefore go to Fernando, you can find his library on github:
    https://github.com/Vargaf/threejs-input-fields

  Reason for not using threejs-input-fields directly:
    - Lots of extensions needed
    - Angular + Typescript wanted
 */

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
