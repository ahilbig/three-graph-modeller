import {Pipe, PipeTransform} from '@angular/core';

export interface IDictionary<T> {
  [id: string]: T;
}

@Pipe({name: 'SecondsToTimeFormatPipe'})
export class SecondsToTimeFormatPipe implements PipeTransform {

  constructor() {}

  transform(seconds: number): string {
    if (seconds > 0) {
      const min = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const hours = Math.floor(min / 60);
      const remainingMinutes = min % 60;
      return this.pad(hours, 2) + ':' + this.pad(remainingMinutes, 2) + ':' + this.pad(remainingSeconds, 2);
    } else if (seconds === 0 || seconds === undefined) {
      return '';
    }

    return 'Error: Received \' + seconds + \' seconds';
  }

  pad(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
}
