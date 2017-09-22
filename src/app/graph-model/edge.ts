import {Vertex} from './vertex';
export class Edge {
  vertexFromId;
  vertexToId;
  directed: boolean;


  constructor(vertexFromId, vertexToId, directed?: boolean) {
    this.vertexFromId = vertexFromId;
    this.vertexToId = vertexToId;
    this.directed = directed;
  }
}
