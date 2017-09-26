import {Vertex} from '../graph-model/vertex';
import {Edge} from '../graph-model/edge';

/**
 * Created by Andreas Hilbig on 13.09.2017.
 */

export interface AutoGraphRenderer {
  autoLayout();
  autoLayoutEdges();
  autoLayoutAddedVertex(vertex: Vertex);
  autoLayoutEdge(edge: Edge);
  autoLayoutRemovedVertex(vertex: Vertex);
  autoLayoutRemovedEdge(edge: Edge);

  addRenderedVertexToGraph(vertex: Vertex, position ?, newId ?): Vertex;
  addRenderedEdgeToGraph(edge: Edge);

  addEventListener(vertex: Vertex, type: string, listener: (event: Event) => any, withBoundingBox?: boolean): void;

  cloneRenderedVertex(vertex: Vertex): Vertex;
}


export interface VertexRenderer {
  createVertexRenderingMixin(vertex: Vertex);
}

export interface AutoEdgeRenderer {
  createRenderingInfo(edge: Edge);
}


export class RenderingInfo {
  private _mapId: string;

  get mapId(): string {
    return this._mapId;
  }

  set mapId(value: string) {
    this._mapId = value;
  }
}
