import {Vertex} from './vertex';
import {Edge} from './edge';
import {AutoGraphLayouter} from '../graph-renderer/graph-renderer.api';
import {RenderedEdge, RenderedVertex} from '../graph-renderer/rendered-object';
import {IDictionary} from '../../../lib/util';

export class Graph {
  graphRenderer: AutoGraphLayouter;
  private autoLayoutEnabled = true;

  constructor(graphRenderer?: AutoGraphLayouter) {
    this.graphRenderer = graphRenderer;
  }

  private _vertexes: IDictionary<RenderedVertex> = {};

  get vertexes(): IDictionary<RenderedVertex> {
    return this._vertexes;
  }

  private _edges: RenderedEdge[] = [];

  get edges(): RenderedEdge[] {
    return this._edges;
  }

  set edges(value: RenderedEdge[]) {
    this._edges = value;
  }

  private _metadata;

  get metadata() {
    return this._metadata;
  }

  set metadata(value) {
    this._metadata = value;
  }

  private _vertexCount = 0;

  get vertexCount() {
    return this._vertexCount;
  }

  initialize(vertexes: Vertex[], edges: Edge[], metadata: { name: string }) {
    this._metadata = metadata;
    this.autoLayoutEnabled = false;
    this.initializeVertexArray(vertexes);
    this.initializeEdges(edges);
    this.graphRenderer.autoLayout();
    this.autoLayoutEnabled = true;
  }

  findVertexById(id) {
    return this._vertexes[id];
  }

  getFromVertex(edge: Edge): Vertex {
    return edge.vertexFromId ? this._vertexes[edge.vertexFromId] : null;
  }

  getToVertex(edge: Edge): Vertex {
    return edge.vertexToId ? this._vertexes[edge.vertexToId] : null;
  }

  addVertex(vertex: Vertex) {
    const id = vertex.vid;
    if (!this._vertexes[id]) {
      this._vertexCount++;
    }

    this.graphRenderer.addRenderedVertexToGraph(vertex);

    if (this.autoLayoutEnabled) {
      this.graphRenderer.autoLayoutAddedVertex(vertex);
    }
  }

  cloneVertex(vid: string): Vertex {
    const clonedVertex = this.graphRenderer.cloneRenderedVertex(this.vertexes[vid]);
    if (clonedVertex) {
      this._vertexCount++;
      if (this.autoLayoutEnabled) {
        this.graphRenderer.autoLayoutAddedVertex(clonedVertex);
      }
    }
    return clonedVertex;
  }

  addEdge(edge: Edge) {
    this.graphRenderer.addRenderedEdgeToGraph(edge);

    if (this.autoLayoutEnabled) {
      this.graphRenderer.autoLayoutEdge(edge);
    }
  }

  removeVertex(id) {
    if (this._vertexes[id]) {
      if (this.autoLayoutEnabled) {
        this.graphRenderer.autoLayoutRemovedVertex(this._vertexes[id]);
      }
      delete this._vertexes[id];
      this._vertexCount--;
    }
  }

  getVertexArray() {
    const arr = [];
    for (const id in this.vertexes) {
      if (this.vertexes.hasOwnProperty(id)) {
        arr.push(this.vertexes[id]);
      }
    }
    return arr;
  }

  private initializeVertexArray(vertexes: Vertex[]) {
    for (const vertex of vertexes) {
      this.addVertex(vertex);
    }
  }

  private initializeEdges(edges: Edge[]) {
    for (const edge of edges) {
      this.addEdge(edge);
    }
  }
}

