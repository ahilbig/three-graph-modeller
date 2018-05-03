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

import * as THREE from "three";
import {RenderedObject} from "../graph-renderer/rendered-object";

abstract class TextField extends RenderedObject {
  id: string;
  private _object3dId;
  parentObject3D: THREE.Object3D;
  dirty: boolean;
  private _text: string;

  constructor(parentObject3D: THREE.Object3D, text?: string, id?: string) {
    super();
    this.parentObject3D = parentObject3D;
    this._text = text;
    this.dirty = (text != undefined);
    this.id = id;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this.dirty = true;
    this._text = value;
  }

  abstract draw(dirty?: boolean);

  drawText(text: string) {
    this.text = text;
    this.draw(true);
  };


  get object3dId() {
    return this._object3dId;
  }

  set object3dId(value) {
    this._object3dId = value;
    if (!this.id) {
      this.id = value;
    }
  }

  protected setObject3dId(obj: THREE.Object3D) {
    this._object3dId = obj.id;
  }
}

export class CanvasTextField extends TextField {
  defaultObjectSize: number;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private mesh: THREE.Mesh;
  private fillStyle: string = "rgba(0,0,255,1)";
  private font: string = "20px Arial";

  static attach(parentObject3D, defaultObjectSize: number, text: string) {
    if (parentObject3D instanceof THREE.Object3D) {
      return new CanvasTextField(parentObject3D, defaultObjectSize, text, true);
    } else {
      throw new Error("Unsupported Operation 'CanvasTextField.attach' for object " + parentObject3D.valueOf() + " of type " + parentObject3D.type);
    }
  }

  constructor(parentObject: THREE.Object3D, defaultObjectSize: number, text?: string, drawNow?: boolean, fillStyle?: string, font?: string, id?: string) {
    super(parentObject, text, id);
    this.defaultObjectSize = defaultObjectSize;
    this.dirty = true;
    this.setTextStyle(fillStyle, font);
    if (drawNow) {
      this.draw();
    }
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.updateTextStyle();
  }

  setTextStyle(fillStyle?: string, font?: string) {
    if (font) {
      this.font = font;
    }
    if (fillStyle) {
      this.fillStyle = fillStyle;
    }

    this.updateTextStyle();
  }

  updateTextStyle() {
    // Only draw now if the text is assumed to be not dirty already because of other reasons..
    let drawNow = !this.dirty;

    if (this.context) {
      if (this.font != this.context.font) {
        this.context.font = this.font;
        this.dirty = true;
      }
      if (this.fillStyle != this.context.fillStyle) {
        this.context.fillStyle = this.fillStyle;
        this.dirty = true;
      }
    }
    if (this.dirty && drawNow) {
      this.draw(true);
    }
  }

  draw(dirty?: boolean) {
    if ((dirty || this.dirty) && this.text) {
      console.log("Redrawing text field");
      this.initCanvas();


      var borderX = 30;
      var borderY = 30;
      var lineHeight = 25;


      var maxWidth = this.canvas.width - 2 * borderX;
      var scaleCanvas2Object = this.defaultObjectSize / this.canvas.width * 3;
      var textHeight = this.wrapText(borderX, borderY, maxWidth, lineHeight);

      // canvas contents will be used for a texture
      var texture1 = new THREE.Texture(this.canvas);
      texture1.needsUpdate = true;

      var material1 = new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide});
      material1.transparent = true;

      this.mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(this.canvas.width * scaleCanvas2Object, this.canvas.height * scaleCanvas2Object),
        material1
      );

      this.mesh.geometry.center();
      this.mesh.position.set(0, -this.defaultObjectSize * 2, this.defaultObjectSize * 1.05);
      this.mesh.rotation.x = 0;
      const child = this.object3dId ? this.parentObject3D.getObjectById(this.object3dId) : null;
      if (child) {
        this.parentObject3D.remove(child);
      }
      this.parentObject3D.add(this.mesh);
      this.setObject3dId(this.mesh);

      this.dirty = false;
    }
  }

  wrapText(x, y, maxWidth, lineHeight): number {
    var words = this.text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        this.context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    this.context.fillText(line, x, y);
    return y + lineHeight;
  }

  getObject3D(): THREE.Object3D {
    return this.mesh;
  }


}

export class CanvasInputField extends CanvasTextField {

  private _editable: boolean;
  private _active: boolean;
  static fillStyleEditable = "rgba(0,0,255,1)";
  static fillStyleNotEditable = "rgba(0,255,255,1)";

  static getFillstyle(editable: boolean) {
    return editable ?
      CanvasInputField.fillStyleEditable : CanvasInputField.fillStyleNotEditable;
  }

  constructor(parentObject: THREE.Object3D, defaultObjectSize: number, text?: string, draw?: boolean, editable?: boolean, id?: string) {
    super(parentObject, defaultObjectSize, text, draw, CanvasInputField.getFillstyle(editable), id);
    this.editable = editable;
  }

  static attach(parentObject3D, defaultObjectSize: number, text: string, editable?: boolean) {
    if (parentObject3D instanceof THREE.Object3D) {
      return new CanvasInputField(parentObject3D, defaultObjectSize, text, true, editable);
    } else {
      throw new Error("Unsupported Operation 'CanvasInputField.attach' for object " + parentObject3D.valueOf() + " of type " + parentObject3D.type);
    }
  }


  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    console.log('Input field' + this.id + ' activated');
    this._active = value;
  }

  get editable(): boolean {
    return this._editable;
  }

  set editable(value: boolean) {
    this._editable = value;
    this.setTextStyle(CanvasInputField.getFillstyle(value));
  }

  processKeyboardEvent(ev: KeyboardEvent) {
    if (this.editable) {
      this.drawText(this.text + ev.key);
    }
  }

  processBackspace() {
    if (this.editable) {
      this.drawText(this.text.substr(0, this.text.length - 1));
    }
  }
}
