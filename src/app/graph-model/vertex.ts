import {RenderingInfo} from '../graph-renderer/graph-renderer.api';
export class Vertex {
  private _id: string;
  private _type: string;

  private _renderingInfo: RenderingInfo;


  constructor(id: string, type: string, renderingInfo?: RenderingInfo) {
    this._id = id;
    this._type = type;
    this._renderingInfo = renderingInfo;
    console.log('Vertex constructed, id=' + id + ', type=' + type);
  }

  get renderingInfo(): RenderingInfo {
    return this._renderingInfo;
  }

  set renderingInfo(value: RenderingInfo) {
    this._renderingInfo = value;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
