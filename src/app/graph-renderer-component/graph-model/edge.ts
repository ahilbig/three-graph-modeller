import {extend, RenderedObject} from '../graph-renderer/rendered-object';

export class Edge {
  vertexFromId: string;
  vertexToId: string;
  eid: string;
  directed: boolean;

  constructor(vertexFromId, vertexToId, eid?: string, directed?: boolean) {
    this.vertexFromId = vertexFromId;
    this.vertexToId = vertexToId;
    this.eid = eid;
    this.directed = directed;
    // Could be inherited but in that case cloning a mixIn will be difficult as next to _prototype an additional constructor will be built
    extend(this, new RenderedObject());
  }
}
