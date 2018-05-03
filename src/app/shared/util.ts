import {Pipe, PipeTransform} from "@angular/core";

export interface IDictionary<T> {
  [id: string]: T;
}

@Pipe({name: 'secondsToTimeFormatPipe'})
export class secondsToTimeFormatPipe implements PipeTransform {

  constructor() {}

  transform(seconds: number): string {
    if (seconds > 0) {
      let min = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;
      let hours = Math.floor(min / 60);
      let remainingMinutes = min % 60;
      return this.pad(hours,2) + ":" + this.pad(remainingMinutes,2) + ":" + this.pad(remainingSeconds,2);
    } else if (seconds == 0 || seconds == undefined) {
      return ""
    }

    return "Error: Received " + seconds + " seconds"
  }

  pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
