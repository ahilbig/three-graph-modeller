import {Vertex} from './vertex';
import {Edge} from './edge';
import {AutoGraphRenderer} from "../graph-renderer/graph-renderer.api";

export interface IDictionary<Vertex> {
  [id: string]: Vertex;
}

export class GraphModel {
  constructor(graphRenderer?: AutoGraphRenderer) {
    this.graphRenderer = graphRenderer;
  }

  initialize(vertexes: Vertex[], edges: Edge[], metadata: { name: string }) {
    this._metadata = metadata;
    this.autoLayoutEnabled = false;
    this.initializeVertexArray(vertexes);
    this.initializeEdges(edges);
    this.graphRenderer.autoLayout();
    this.autoLayoutEnabled = true;
  }

  private _vertexes: IDictionary<Vertex> = {};
  private _edges: Edge[] = [];

  private _metadata;
  private _vertexCount = 0;

  graphRenderer: AutoGraphRenderer;
  private autoLayoutEnabled = true;

  private initializeVertexArray(vertexes: Vertex[]) {
    for (let vertex of vertexes) {
      this.addVertex(vertex);
    }
  }
  private initializeEdges(edges: Edge[]) {
    for (let edge of edges) {
      this.addEdge(edge);
    }
  }

  get metadata() {
    return this._metadata;
  }

  set metadata(value) {
    this._metadata = value;
  }

  get vertexes(): IDictionary<Vertex> {
    return this._vertexes;
  }

  get edges(): Edge[] {
    return this._edges;
  }

  set edges(value: Edge[]) {
    this._edges = value;
  }

  findVertexById(id) {
    return this._vertexes[id];
  }

  getFromVertex(edge: Edge): Vertex {
    return edge.vertexFromId ? this._vertexes[edge.vertexFromId]: null;
  }

  getToVertex(edge: Edge): Vertex {
    return edge.vertexToId ? this._vertexes[edge.vertexToId]: null;
  }

  addVertex(vertex: Vertex) {
    let id = vertex.vid;
    if (!this._vertexes[id]) {
      this._vertexCount++;
    }

    this.graphRenderer.addRenderedVertexToGraph(vertex);

    if (this.autoLayoutEnabled) {
      this.graphRenderer.autoLayoutAddedVertex(vertex);
    }
  }
  addEdge(edge: Edge) {
    this.graphRenderer.addRenderedEdgeToGraph(edge);

    if (this.autoLayoutEnabled) {
      this.graphRenderer.autoLayoutEdge(edge);
    }
  }

  removeVertex(id) {
    if(this._vertexes[id]) {
      if(this.autoLayoutEnabled) {
        this.graphRenderer.autoLayoutRemovedVertex(this._vertexes[id]);
      }
      delete this._vertexes[id];
      this._vertexCount--;
    }
  }

  get vertexCount() {
    return this._vertexCount
  }

  getVertexArray() {
    var arr = [];
    for (let id in this.vertexes) {
      arr.push(this.vertexes[id]);
    }
    return arr;
  }

}


export class EnterpriseModelInitialDataLoader  {
 static initializeGraphModel(graphModel: GraphModel) {
    const vertexes: Vertex[] = [{vid: 'c1', name: 'Customer', vtype: 'PERSON'},
      {vid: 'p1', name: 'Webshop', vtype: 'POS'}, {vid: 'b1', name: 'Billing', vtype: 'BILLING'}];
    const edges: Edge[] = [new Edge('c1', 'p1', true), new Edge('p1', 'b1'),
      new Edge('b1', 'c1', true)];
    const metadata = {name: 'My super company'};

    graphModel.initialize(vertexes, edges,  metadata);

  }
}
