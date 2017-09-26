import {Vertex} from "../graph-model/vertex";
import {GraphModel} from "../graph-model/graph-model";
import * as THREE from 'three';

export class GraphControl {

  graphModel: GraphModel;

  constructor(graphModel: GraphModel) {
    this.graphModel = graphModel;
  }

  addVertexControls(obj: THREE.Object3D & Vertex) {
    this.graphModel.graphRenderer.addEventListener(obj,"dblclick", (event:Event) => {
      this.graphModel.cloneVertex(obj.vid);
    })
  }

  generateCloneId(id: string): string {
    // Use -c seperator to split original id from clone index (if id is not id of a clone then the resulting array will have length 1)
    var splitId = id.split('-c');
    var newCloneIndex=splitId.length==1 ? 1: parseInt(splitId[1])+1;

    var candidateId = splitId[0] + '-c' + newCloneIndex;

    // Return candidate Id if not exists, otherwise calculate next available clone id recursively
    return this.graphModel.vertexes[candidateId] ? this.generateCloneId(candidateId): candidateId;
  }
}
