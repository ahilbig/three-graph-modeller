import {extend, RenderedObject} from '../graph-renderer/rendered-object';
import {CanvasInputField} from '../three-forms/three-text-field';

export class Vertex {
  vid: string;
  vname: string;
  vtype: string;
  description: string;

  constructor(id: string, name: string, type, description?: string) {
    this.vid = id;
    this.vname = name;
    this.vtype = type;
    if (description === undefined) {
      this.description = '';
    } else {
      this.description = description;
    }
    // Could be inherited but in that case cloning a mixIn will be difficult as next to _prototype an additional constructor will be built
    extend(this, new RenderedObject());
    console.log('Vertex constructed, vid=' + id + ', vname=' + name + ', vtype=' + type);
  }

  addLabel(defaultObjectSize: number, text: string): CanvasInputField {
    // CanvasTextField.attach(this, defaultObjectSize, text);
    return CanvasInputField.attach(this, defaultObjectSize, text);
  }
}

