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
import {CanvasInputField} from "./three-text-field";
import {IDictionary} from "../graph-model/graph-model";

export class ThreeInputManager {

  graphRenderer: CircleAutoGraphRenderer;
  inputFields: IDictionary<CanvasInputField> = {};
  private _activeInputField: CanvasInputField;

  constructor(graphRenderer: CircleAutoGraphRenderer) {
    this.graphRenderer = graphRenderer;
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    // do something meaningful with it
    console.log(`The user just pressed the ${ev.key} key!`);
    if (this._activeInputField) {
      this._activeInputField.processKeyboardEvent(ev);
    }
  }

  registerInputField(inputField: CanvasInputField) {
    var comp = this;
    this.inputFields[inputField.id] = inputField;
    inputField.addEventListener('click',(event:Event) => {
      comp.activeInputField = inputField;
    });

  }


  get activeInputField(): CanvasInputField {
    return this._activeInputField;
  }

  set activeInputField(inputField: CanvasInputField) {
    if (!inputField.active) {
      if(this._activeInputField) {
        this._activeInputField.editable = false;
        this._activeInputField.active = false;
      }
      this._activeInputField = inputField;
      this._activeInputField.active = true;
      this._activeInputField.editable = true;
    }
  }
}
