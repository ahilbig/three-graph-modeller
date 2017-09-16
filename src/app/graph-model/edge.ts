import {Vertex} from './vertex';
export class Edge {
  private _vertexFrom;
  private _vertexTo;
  private _directed: boolean;


  constructor(vertexFrom, vertexTo, directed?: boolean) {
    this._vertexFrom = vertexFrom;
    this._vertexTo = vertexTo;
    this._directed = directed;
  }


  get directed(): boolean {
    return this._directed;
  }

  set directed(value: boolean) {
    this._directed = value;
  }

  get vertexFrom() {
    return this._vertexFrom;
  }

  set vertexFrom(value) {
    this._vertexFrom = value;
  }

  get vertexTo() {
    return this._vertexTo;
  }

  set vertexTo(value) {
    this._vertexTo = value;
  }
}
