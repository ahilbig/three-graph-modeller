import {Vertex} from '../graph-model/vertex';
import {Edge} from '../graph-model/edge';

/**
 * Created by Andreas Hilbig on 13.09.2017.
 */

export interface AutoGraphLayouter {
  autoLayout();
  autoLayoutEdges();
  autoLayoutAddedVertex(vertex: Vertex);
  autoLayoutEdge(edge: Edge);
  autoLayoutRemovedVertex(vertex: Vertex);
  autoLayoutRemovedEdge(edge: Edge);

  addRenderedVertexToGraph(vertex: Vertex, position ?, newId ?): Vertex;
  addRenderedEdgeToGraph(edge: Edge);

  cloneRenderedVertex(vertex: Vertex): Vertex;
}


export interface VertexRenderer {
  createVertexRenderingMixin(vertex: Vertex);
}
