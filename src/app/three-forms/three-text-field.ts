import * as THREE from 'three';
import {RenderedObject} from "../graph-renderer/rendered-object";

abstract class TextField extends RenderedObject {
  id: string;
  parentObject3D: THREE.Object3D;
  dirty: boolean;
  private _text: string;

  constructor(parentObject3D: THREE.Object3D, text?: string, id?: string) {
    super();
    this.parentObject3D = parentObject3D;
    this._text = text;
    this.dirty = (text != undefined);
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

  protected setIdFromObject(obj: THREE.Object3D) {
    if (!this.id) {
      this.id = obj.id;
    }
  }

}

export class CanvasTextField extends TextField {
  defaultObjectSize: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;


  static attach(parentObject3D, defaultObjectSize: number, text: string) {
    if(parentObject3D instanceof THREE.Object3D) {
      return new CanvasTextField(parentObject3D, defaultObjectSize, text, true);
    } else {
      throw new Error("Unsupported Operation 'CanvasTextField.attach' for object " + parentObject3D.valueOf() + " of type " + parentObject3D.type);
    }
  }

  constructor(parentObject: THREE.Object3D, defaultObjectSize: number, text?: string, draw?: boolean, id?: string) {
    super(parentObject, text, id);
    this.defaultObjectSize = defaultObjectSize;
    this.initCanvas();
    if (draw) {
      this.draw(true);
    }
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.font = "20px Arial";
    this.context.fillStyle = "rgba(0,0,255,1)";
  }

  draw(dirty?: boolean) {
    if ((dirty || this.dirty) && this.text) {
      console.log("Redrawing text field");

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

      var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(this.canvas.width * scaleCanvas2Object, this.canvas.height * scaleCanvas2Object),
        material1
      );

      this.setIdFromObject(mesh1);

      mesh1.geometry.center();
      mesh1.position.set(0, -this.defaultObjectSize * 2, this.defaultObjectSize * 1.05);
      mesh1.rotation.x = 0;
      const child = this.parentObject3D.getObjectById(this.id);
      if (child) {
        this.parentObject3D.remove(child);
      }
      this.parentObject3D.add(mesh1);
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
}

export class CanvasInputField extends CanvasTextField {

}
