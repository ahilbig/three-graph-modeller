import {RenderingInfo} from '../graph-renderer/graph-renderer.api';

export class Vertex {
  vid: string;
  vname: string;
  vtype: string;

  constructor(id: string, name: string, type: string) {
    this.vid = id;
    this.vname = name;
    this.vtype = type;
    console.log('Vertex constructed, vid=' + id + ', vname=' + name + ', vtype=' + type);
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


