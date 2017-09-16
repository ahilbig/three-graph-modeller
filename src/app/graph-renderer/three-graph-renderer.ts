///<reference path="graph-renderer.component.ts"/>
import * as THREE from 'three';
import {GraphModel, GraphModelFactory} from '../graph-model/graph-model';
import {AutoGraphRenderer, RenderingInfo, VertexRenderer} from './graph-renderer.api';
import {Vertex} from '../graph-model/vertex';
import {Edge} from '../graph-model/edge';

/**
 * Created by Andreas Hilbig on 11.09.2017.
 */


export class ThreeVertexRenderingInfo extends RenderingInfo {

  private _mesh: THREE.Mesh;

  get mesh(): THREE.Mesh {
    return this._mesh;
  }

  set mesh(value: THREE.Mesh) {
    this._mesh = value;
  }

  constructor(mesh: THREE.Mesh) {
    super();
    this._mesh = mesh;
  }

  getPosition(): THREE.Vector3 {
    return this.mesh.position;
  }

  setPposition(value: THREE.Vector3) {
    this._mesh.position.set(value.x, value.y, value.z);
  }

  getXPosition(): number {
    return this._mesh.position.x;
  }

  getYPosition(): number {
    return this._mesh.position.y;
  }

  getZPosition(): number {
    return this._mesh.position.z;
  }
}

export class CircleAutoGraphRenderer implements AutoGraphRenderer {

  private vertexRenderer: ThreeAutoVertexFromTypeRenderer = new ThreeAutoVertexFromTypeRenderer();

  private _meshObjects: Array<THREE.Mesh> = new Array();
  private _scene: THREE.Scene;
  private _defaultObjectSize: number;


  constructor(scene: THREE.Scene, defaultObjectSize?: number) {
    this._scene = scene;
    this._defaultObjectSize = defaultObjectSize;
  }

  get defaultObjectSize(): number {
    return this._defaultObjectSize;
  }

  set defaultObjectSize(value: number) {
    this._defaultObjectSize = value;
  }

  get scene(): THREE.Scene {
    return this._scene;
  }

  set scene(value: THREE.Scene) {
    this._scene = value;
  }

  get meshObjects(): Array<THREE.Mesh> {
    return this._meshObjects;
  }

  autoRender(graphModel: GraphModel) {
    const r = 100;
    const n = graphModel.vertexes.length;
    const alpha = 2 * Math.PI / (n);
    const z = 0;
    let x, y;

    for (let i = 0; i < graphModel.vertexes.length; i++) {
      const vertex = graphModel.vertexes[i];
      x = r * Math.sin(alpha * i);
      y = r * Math.cos(alpha * i);

      console.log('Vertex ' + i + ', name=' + vertex.id + ', type=' + vertex.type + ' added at alpha=' + alpha * i + ',  position={' + x + ',' + y + ',' + z + '}.');

      this.setVertexPosition(graphModel.vertexes[i], {x, y, z});
    }
  }

  setVertexPosition(vertex: Vertex, position: THREE.Vector3) {
    if (!vertex.renderingInfo) {
      this.vertexRenderer.createRenderingInfo(vertex, position, this._meshObjects);
      const mesh: THREE.Mesh = (<ThreeVertexRenderingInfo>vertex.renderingInfo).mesh;
      this._meshObjects.push();
      this._scene.add(mesh);
    } else {
      (<ThreeVertexRenderingInfo> vertex.renderingInfo).setPposition(position);
    }
  }

  autoRenderAddVertex(graphModel: GraphModel, vertex: Vertex) {
    graphModel.addVertex(vertex);
    this.autoRender(graphModel);
  }

  autoRenderMoveVertex(graphModel: GraphModel, index: number) {
    graphModel.addVertex(graphModel.findVertexByIndex(index));
    this.autoRender(graphModel);
  }

  autoRenderAddEdge(graphModel: GraphModel, edge: Edge, moveVertexes?: boolean) {
    throw new Error('Method not implemented.');
  }

  autoRenderEdge(graphModel: GraphModel, edge: Edge, moveVertexes?: boolean) {
    throw new Error('Method not implemented.');
  }
}

export class ThreeAutoVertexFromTypeRenderer implements VertexRenderer {

  _textures = ['/assets/textures/vertex_POS_Box.gif', '/assets/textures/vertex_BILLING_Box.gif', '/assets/textures/crate.gif'];

  extrudeSettings = {amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1};
  private defaultObjectSize;


  constructor(defaultObjectSize?: number) {
    this.defaultObjectSize = defaultObjectSize ? defaultObjectSize : 20;
  }

  createRenderingInfo(vertex: Vertex, position?: THREE.Vector3, meshObjects?: Array<THREE.Mesh>) {
    let mesh;
    switch (vertex.type) {
      case 'PERSON':
        mesh = this.createSmileyShapeMesh(0xf000f0, this.defaultObjectSize, position);
        break;
      case 'POS':
        mesh = this.createCube(this._textures[0], this.defaultObjectSize, position);
        break;
      case 'BILLING':
        mesh = this.createCube(this._textures[1], this.defaultObjectSize, position);
        break;
      default:
        mesh = this.createCube(this._textures[2], this.defaultObjectSize, position);
    }
    vertex.renderingInfo = new ThreeVertexRenderingInfo(mesh);
    if (meshObjects) {
      meshObjects.push(mesh);
    }
  }

  private createCube(texturePath: string, geometrySize: number, position?: THREE.Vector3) {
    const texture = new THREE.TextureLoader().load(texturePath);
    const material = new THREE.MeshBasicMaterial({map: texture});

    const geometry = new THREE.BoxBufferGeometry(geometrySize, geometrySize, geometrySize);

    const newCube = new THREE.Mesh(geometry, material);
    if (position) {
      newCube.position.set(position.x, position.y, position.z);
    }

    return newCube;
  }

  createSmileyShapeMesh(color, size: number, position?: THREE.Vector3): THREE.Mesh {
    const smileyShape = new THREE.Shape();
    smileyShape.moveTo(80, 40);
    smileyShape.absarc(40, 40, 40, 0, Math.PI * 2, false);
    const smileyEye1Path = new THREE.Path();
    smileyEye1Path.moveTo(35, 20);
    smileyEye1Path.absellipse(25, 20, 10, 10, 0, Math.PI * 2, true);
    smileyShape.holes.push(smileyEye1Path);
    const smileyEye2Path = new THREE.Path();
    smileyEye2Path.moveTo(65, 20);
    smileyEye2Path.absarc(55, 20, 10, 0, Math.PI * 2, true);
    smileyShape.holes.push(smileyEye2Path);
    const smileyMouthPath = new THREE.Path();
    smileyMouthPath.moveTo(20, 40);
    smileyMouthPath.quadraticCurveTo(40, 60, 60, 40);
    smileyMouthPath.bezierCurveTo(70, 45, 70, 50, 60, 60);
    smileyMouthPath.quadraticCurveTo(40, 80, 20, 60);
    smileyMouthPath.quadraticCurveTo(5, 50, 20, 40);
    smileyShape.holes.push(smileyMouthPath);

    return this.addShape(
      smileyShape, this.extrudeSettings, color,
      position ? position : new THREE.Vector3 (- 200, 250, 0),
      0 , 0, Math.PI , this.defaultObjectSize / 80);
  }

  addShape(shape: THREE.Shape, extrudeSettings, color, position: THREE.Vector3, rx, ry, rz, s) {
    // note: default UVs generated by ShapeBufferGeometry are simply the x- and y-coordinates of the vertices
    // extruded shape
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mesh: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color}));
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    return mesh;
  }
}

