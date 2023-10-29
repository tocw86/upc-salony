import { Pipe, PipeTransform } from '@angular/core';
import { Showroom } from 'src/app/core/model/lbok.model';

@Pipe({ name: 'cityPipe' })
export class CityPipe implements PipeTransform {
  public transform(items: Showroom[], inputValue: Showroom | null): Showroom[] {
    return !items || !inputValue ? items : items.filter(item => item.city === inputValue.city);
  }
}
