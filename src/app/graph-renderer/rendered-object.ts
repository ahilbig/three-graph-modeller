import * as THREE from 'three';
import * as THREEx from 'threex.domevents';
import {Vertex} from "../graph-model/vertex";

export class RenderObjectController {
  static instance: RenderObjectController = new RenderObjectController();
  _domEvents: THREEx.DomEvents;

  static setupDomEvents(camera: THREE.Camera, domElement?: HTMLElement) {
    RenderObjectController.instance._domEvents = new THREEx.THREEx.DomEvents(camera, domElement);
  }

  addEventListener(object3D: THREE.Object3D, type: string, listener: (event: Event) => void, withBoundingBox: boolean) {
    this._domEvents.addEventListener(object3D, type, listener, withBoundingBox ? withBoundingBox : true);
  }
}

export class RenderedObject {
  addEventListener(type: string, listener: (event: Event) => void, withBoundingBox?: boolean): void {
    if (this.isObject3D()) {
      RenderObjectController.instance.addEventListener(<THREE.Object3D> this, type, listener, withBoundingBox ? withBoundingBox : true);
    } else {
      throw new Error("Unable to register event - vertex is no 3D Object");
    }
  }

  isObject3D(): this is THREE.Object3D {
    return (this instanceof THREE.Object3D);
  }

}


export function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U> first;
  /*
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  */
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}


export type RenderedVertex = Vertex & RenderedObject & THREE.Object3D;
export type RenderedEdge = Vertex & RenderedObject & THREE.Object3D;
