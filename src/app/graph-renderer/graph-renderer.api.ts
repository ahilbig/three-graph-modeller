import {GraphModel} from '../graph-model/graph-model';
import {Vertex} from '../graph-model/vertex';
import {Edge} from '../graph-model/edge';
/**
 * Created by Andreas Hilbig on 13.09.2017.
 */

export interface AutoGraphRenderer {
  autoRender(graphModel: GraphModel);
  autoRenderAddVertex(graphModel: GraphModel, vertex: Vertex);
  autoRenderAddEdge(graphModel: GraphModel, edge: Edge, moveVertexes?: boolean);
}


export interface VertexRenderer {
  createRenderingInfo(vertex: Vertex);
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
