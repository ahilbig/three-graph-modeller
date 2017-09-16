import {Vertex} from './vertex';
import {Edge} from './edge';
import {GraphModelLoader} from './graph-model.component';

export class GraphModel {
  constructor(vertexes: Vertex[], edges: Edge[], metadata?) {
    this._vertexes = vertexes;
    this._edges = edges;
    this._metadata = metadata;
  }

  private _vertexes: Vertex[];
  private _edges: Edge[];

  private _metadata;

  get metadata() {
    return this._metadata;
  }

  set metadata(value) {
    this._metadata = value;
  }

  get vertexes(): Vertex[] {
    return this._vertexes;
  }

  set vertexes(value: Vertex[]) {
    this._vertexes = value;
  }

  get edges(): Edge[] {
    return this._edges;
  }

  set edges(value: Edge[]) {
    this._edges = value;
  }

  addVertex(vertex: Vertex) {
    this._vertexes.push(vertex);
  }

  findVertexByIndex(index: number) {
    return this._vertexes[index];
  }
}

export class GraphModelFactory {
  static createGraphModel(vertexes: Vertex[], edges: Edge[]) {
    return new GraphModel(vertexes, edges);
  }

}

export class EnterpriseModelInitialDataLoader implements GraphModelLoader {
  loadGraphModel(): GraphModel {
    const vertexes: Vertex[] = [new Vertex('Webshop', 'POS'), new Vertex('Billing', 'BILLING'), new Vertex('Customer', 'PERSON')];
    const edges: Edge[] = [new Edge('Customer', 'Webshop', true), new Edge('Webshop', 'Billing'),
      new Edge('Billing', 'Customer', true)];
    const metadata = {name: 'My super company'};

    return new GraphModel(vertexes, edges,  metadata);

  }
}
