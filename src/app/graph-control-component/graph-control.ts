import {Vertex} from "../graph-model/vertex";
import {GraphModel} from "../graph-model/graph-model";
import * as THREE from 'three';
import {RenderedVertex} from "../graph-renderer/rendered-object";

export class GraphControl {
  graphModel: GraphModel;
  public controls: THREE.OrbitControls;
  private dragControls: THREE.DragControls;

  constructor(graphModel: GraphModel) {
    this.graphModel = graphModel;
  }

  addVertexControls(obj: RenderedVertex) {
    obj.addEventListener("dblclick", (event:Event) => {
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

  createDragControls(camera: THREE.Camera, domElement?: HTMLElement) {
    this.dragControls = new THREE.DragControls(this.graphModel.getVertexArray(), camera, domElement);

    const component: GraphControl = this;

    this.dragControls.addEventListener('dragstart', (event: Event) => {
      component.controls.enabled = false;
    });
    this.dragControls.addEventListener('dragend', (event: Event) => {
      console.log("dragend event detected, enabling controls");
      component.controls.enabled = true;
    });
    this.dragControls.addEventListener('drag', (event: Event) => {
      component.graphModel.graphRenderer.autoLayoutEdges();
    });
  }

  updateDragControls(camera: THREE.Camera, domElement?: HTMLElement) {
    this.dragControls.dispose();
    this.createDragControls(camera, domElement);
  }

  createOrbitControls(camera: THREE.Camera) {
    this.controls = new THREE.OrbitControls(camera);
    this.controls.target = new THREE.Vector3(0, 0, 0);
    this.controls.maxDistance = 150;
    // How far you can orbit vertically, upper and lower limits.
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    // How far you can dolly in and out ( PerspectiveCamera only )
    this.controls.minDistance = 0;
    this.controls.maxDistance = Infinity;

    this.controls.enableZoom = true; // Set to false to disable zooming
    this.controls.zoomSpeed = 1.0;

    this.controls.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

  }
}
