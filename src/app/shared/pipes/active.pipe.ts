import { Pipe, PipeTransform } from '@angular/core';
import { Showroom } from 'src/app/core/model/lbok.model';

@Pipe({ name: 'activePipe' })
export class ActivePipe implements PipeTransform {
  public transform(items: Array<Showroom> | null): Array<Showroom> {
    return items?.filter(item => item.content?.trim()) ?? [];
  }
}
