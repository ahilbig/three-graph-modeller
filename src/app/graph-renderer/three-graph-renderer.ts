///<reference path="graph-renderer.component.ts"/>
import * as THREE from 'three';
import {GraphModel} from '../graph-model/graph-model';
import {AutoGraphRenderer, VertexRenderer} from './graph-renderer.api';
import {extend, Vertex} from '../graph-model/vertex';
import {Edge} from '../graph-model/edge';

/**
 * Created by Andreas Hilbig on 11.09.2017.
 */

export class CircleAutoGraphRenderer implements AutoGraphRenderer {
  private vertexRenderer: ThreeAutoVertexFromTypeRenderer = new ThreeAutoVertexFromTypeRenderer();

  private _scene: THREE.Scene;
  private _defaultObjectSize: number;
  private rotationSpeedX = 0;
  private rotationSpeedY = 0;
  private _graphModel: GraphModel;

  constructor( scene: THREE.Scene, defaultObjectSize: number, rotationSpeedX: number, rotationSpeedY: number, graphModel?: GraphModel) {
    this._scene = scene;
    this._defaultObjectSize = defaultObjectSize;
    this.rotationSpeedX = rotationSpeedX;
    this.rotationSpeedY = rotationSpeedY;
    this._graphModel = graphModel;
  }


  get graphModel(): GraphModel {
    return this._graphModel;
  }

  set graphModel(value: GraphModel) {
    this._graphModel = value;
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

  autoLayout() {
    const r = 100;
    const n = this._graphModel.vertexCount;
    const alpha = 2 * Math.PI / (n);
    const z = 0;
    let x, y;

    // Render vertexes
    let i = 0;
    for (let id in this._graphModel.vertexes) {
      const vertex = this._graphModel.vertexes[id];
      if(this.isObject3D(vertex)) {
        x = r * Math.sin(alpha * i);
        y = r * Math.cos(alpha * i);

        console.log('Vertex vid=' + id + ', name=' + vertex.name + ', vtype=' + vertex.vtype + ' added at alpha=' + alpha * i + ',  position={' + x + ',' + y + ',' + z + '}.');
        this.setObject3DPosition(vertex, {x, y, z});
      } else {
        console.log('Can\'t render Vertex vid=' + id);
      }
      i++;
    }
    this.autoLayoutEdges();
  }

  autoLayoutEdges() {
    for (let i = 0; i < this._graphModel.edges.length; i++) {
      this.autoLayoutEdge(this._graphModel.edges[i]);
    }
  }

  autoLayoutRemovedVertex(vertex: Vertex) {
    this.autoLayout();
  }

  autoLayoutRemovedEdge(edge: Edge) {
    this.autoLayout();
  }

  autoLayoutAddedVertex(vertex: Vertex & THREE.Object3D) {
    this.autoLayout();
  }

  addRenderedVertexToGraph(vertex: Vertex, position ?: THREE.Vector3): Vertex & THREE.Object3D {
    if (this.isObject3D(vertex)) {
      if (position) {
        this.setObject3DPosition(vertex, position);
      }
      return vertex;
    }
    else {
      var renderedVertex = this.vertexRenderer.createVertexRenderingMixin(vertex, position);
      this._graphModel.vertexes[renderedVertex.vid] = renderedVertex;
      this.scene.add(renderedVertex);
      return renderedVertex;
    }
  }
  addRenderedEdgeToGraph(edge: Edge) {
    if (this.isObject3D(edge)) {
      return edge;
    }
    else {
      const fromVertex3D: THREE.Object3D & Vertex = this._graphModel.getFromVertex(edge);
      const toVertex3D: THREE.Object3D & Vertex = this._graphModel.getToVertex(edge);
      var renderedEdge = this.vertexRenderer.createEdgeRenderingMixin(edge, fromVertex3D, toVertex3D);
      this._graphModel.edges.push(renderedEdge);
      this.scene.add(renderedEdge);
      return renderedEdge;
    }
  }

  isObject3D(vertex: Vertex | THREE.Object3D): vertex is THREE.Object3D {
    return (vertex instanceof THREE.Object3D);
  }

  private setObject3DPosition(obj: THREE.Object3D, position: THREE.Vector3) {
    obj.position.set(position.x, position.y, position.z);
  }

  autoRenderMoveVertex(graphModel: GraphModel, index: number) {
    this.autoLayout();
  }

  autoLayoutEdge(edge: Edge, moveVertexes?: boolean) {
    const fromVertex3D: THREE.Object3D & Vertex = this._graphModel.getFromVertex(edge);
    const toVertex3D: THREE.Object3D & Vertex = this._graphModel.getToVertex(edge);

    if (fromVertex3D && toVertex3D) {
      this.vertexRenderer.updateLineGeometry(<THREE.Line> edge, fromVertex3D.position, toVertex3D.position);
    } else {
      console.log("Unable to render edge from vertex " + this._graphModel.getFromVertex(edge).vid + " to vertex " + this._graphModel.getToVertex(edge).vid + ", missing renderingInfo.");
    }

  }

  animateObjects() {
    if (this.rotationSpeedX > 0 || this.rotationSpeedY > 0) {
      var vertexes = this._graphModel.vertexes;
      for (let id in vertexes) {
        (<THREE.Object3D> vertexes[id]).rotation.x += this.rotationSpeedX;
        (<THREE.Object3D> vertexes[id]).rotation.y += this.rotationSpeedY;
      }
    }
  }
}

export class ThreeAutoVertexFromTypeRenderer implements VertexRenderer {

  _textures = ['/assets/textures/vertex_POS_Box.gif', '/assets/textures/vertex_BILLING_Box.gif', '/assets/textures/crate.gif'];

  extrudeSettings = {amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1};
  private defaultObjectSize;


  constructor(defaultObjectSize?: number) {
    this.defaultObjectSize = defaultObjectSize ? defaultObjectSize : 20;
  }

  createVertexRenderingMixin(vertex: Vertex, position?: THREE.Vector3): Vertex & THREE.Object3D {
    let mesh;
    switch (vertex.vtype) {
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
    return extend(mesh, vertex);
  }

  createEdgeRenderingMixin(edge: Edge, fromVertex3D: THREE.Object3D, toVertex3D: THREE.Object3D ): Edge & THREE.Object3D {
    if (fromVertex3D && toVertex3D) {
      return extend(this.createLine(fromVertex3D.position, toVertex3D.position), edge);
    } else {
      console.log("Unable to render edge from vertex " + fromVertex3D? fromVertex3D.id:'?' + " to vertex " + toVertex3D? toVertex3D.id:'?' + ".");
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
      position ? position : new THREE.Vector3(-200, 250, 0),
      0, 0, Math.PI, this.defaultObjectSize / 80);
  }

  createLine(pos1: THREE.Vector3, pos2: THREE.Vector3): THREE.Line {
    //create a blue LineBasicMaterial
    let material = new THREE.LineBasicMaterial({color: 0x0000ff});
    var geometry = new THREE.Geometry();
    geometry.vertices.push(pos1);
    geometry.vertices.push(pos2);

    return new THREE.Line(geometry, material);

  }
  updateLineGeometry(line: THREE.Line, pos1: THREE.Vector3, pos2: THREE.Vector3): THREE.Line {
    line.geometry.vertices[0] = pos1;
    line.geometry.vertices[1] = pos2;
    line.geometry.verticesNeedUpdate = true;
    return line;
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

