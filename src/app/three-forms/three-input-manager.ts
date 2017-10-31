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
  private _eventIgnored = false;
  private _ignoredEent: KeyboardEvent;


  constructor(graphRenderer: CircleAutoGraphRenderer) {
    this.graphRenderer = graphRenderer;
    this.initKeyBindings();
  }

  initKeyBindings() {
    var comp = this;
    Mousetrap.bind('backspace', function (ev: KeyboardEvent) {
      comp.ignoreEvent(ev);
      if (comp._activeInputField) {
        comp._activeInputField.processBackspace();
      }
      console.log('backspace processed');
    });
    Mousetrap.bind('shift', function (ev: KeyboardEvent) {
      comp.ignoreEvent(ev);
      console.log('Mousetrap shift pressed');
    });
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    // do something meaningful with it
    console.log(`The user just pressed the ${ev.key} key!`);
    if (!this.isEventIgnoredOnce(ev) && this._activeInputField) {
      this._activeInputField.processKeyboardEvent(ev);
    }

  }

  ignoreEvent(ev: KeyboardEvent) {
    this._eventIgnored = true;
    this._ignoredEent = ev;
  }

  private isEventIgnoredOnce(ev: KeyboardEvent) {
    if (this._eventIgnored && ev.key === this._ignoredEent.key) {
      console.log(`Ignoring the ${ev.key} key, eventIgnored: ${this._eventIgnored}, ignoredEvent.key: ${this._ignoredEent.key}`);

      this._eventIgnored = false;
      this._ignoredEent = null;
      return true;
    } else {
      console.log(`Not ignoring the ${ev.key} key, eventIgnored: ${this._eventIgnored}, ignoredEvent.key: ${this._ignoredEent ? this._ignoredEent.key : null}`);
      return false;
    }

  }

  registerInputField(inputField: CanvasInputField) {
    var comp = this;
    this.inputFields[inputField.id] = inputField;
    inputField.addEventListener('click', (event: Event) => {
      comp.activeInputField = inputField;
    });

  }


  get activeInputField(): CanvasInputField {
    return this._activeInputField;
  }

  set activeInputField(inputField: CanvasInputField) {
    if (!inputField.active) {
      if (this._activeInputField) {
        this._activeInputField.editable = false;
        this._activeInputField.active = false;
      }
      this._activeInputField = inputField;
      this._activeInputField.active = true;
      this._activeInputField.editable = true;
    }
  }

}
