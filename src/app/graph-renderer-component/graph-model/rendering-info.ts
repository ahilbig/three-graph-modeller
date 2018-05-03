import * as THREE from "three";

class VertexRenderingInfo {
  vid : string;
  attachedToVertexId: string;
}

class EdgeRenderingInfoThree {
  eid: string;
  attachToTarget: boolean;
  attachSourceBottom: THREE.Vector3;
  attachedTop: THREE.Vector3;
  attachDistance: number;
}

