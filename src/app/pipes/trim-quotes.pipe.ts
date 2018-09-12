import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimQuotes'
})
export class TrimQuotesPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if(value != undefined){
      return value.replace(/["]/g, "");
    } else {
      return value
    }

  }

}
