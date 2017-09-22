import {RenderingInfo} from '../graph-renderer/graph-renderer.api';

export class Vertex {
  readonly vid: string;
  name: string;
  vtype: string;

  constructor(id: string, name: string, type: string) {
    this.vid = id;
    this.name = name;
    this.vtype = type;
    console.log('Vertex constructed, vid=' + id + ', name=' + name + ', vtype=' + type);
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


