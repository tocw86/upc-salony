import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  public transform(inputValue: string, search: string | RegExp, replaceValue: string): string {
    return inputValue?.replace(search, replaceValue) ?? '';
  }
}
