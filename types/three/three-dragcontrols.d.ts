import {Camera, MOUSE, Object3D, Vector3} from './three-core';

export class DragControls {
  constructor(objects, camera: Camera, domElement?: HTMLElement);

  object: Camera;
  domElement: HTMLElement | HTMLDocument;


  onDocumentMouseMove(event: any): void;
  onDocumentMouseDown(event: any): void;
  onDocumentMouseCancel(event: any): void;
  onDocumentTouchMove(event: any): void;
  onDocumentTouchStart(event: any): void;
  onDocumentTouchEnd(event: any): void;


  activate(): void;

  deactivate(): void;

  dispose(): void;

  // EventDispatcher mixins
  addEventListener(type: string, listener: (event: Event) => void ): void;
  hasEventListener(type: string, listener: (event: Event) => void): void;
  removeEventListener(type: string, listener: (event: Event) => void): void;
  dispatchEvent(event: { type: string; [attachment: string]: any; }): void;

}
