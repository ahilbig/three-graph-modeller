import {Camera} from './three-core';

export class DragControls {
  constructor(objects, camera: Camera, domElement?: HTMLElement);

  object: Camera;
  domElement: HTMLElement | HTMLDocument;

  activate(): void;

  deactivate(): void;

  dispose(): void;

  // EventDispatcher mixins
  addEventListener(type: string, listener: (event: Event) => void ): void;
  hasEventListener(type: string, listener: (event: Event) => void): void;
  removeEventListener(type: string, listener: (event: Event) => void): void;
  dispatchEvent(event: { type: string; [attachment: string]: any; }): void;

}
