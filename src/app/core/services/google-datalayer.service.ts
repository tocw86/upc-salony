import { Injectable } from '@angular/core';
import { DataLayerParams } from '../model/datalayer.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleDatalayerService {
  constructor() {}

  public dataLayerMarkerClick(city: string, street: string): void {
    if (this.isValidString(city) && this.isValidString(street)) {
      const params: DataLayerParams = this.createDataLayerParams(
        'event.pos',
        'pos',
        `pos|open-${city}-${street}`,
        'pos|open'
      );
      window.parent.postMessage(params, '*');
    }
  }

  public dataLayerSelectClick(city?: string): void {
    if (this.isValidString(city)) {
      const params: DataLayerParams = this.createDataLayerParams('event.pos', 'pos', `pos|list-${city}`, 'pos|list');
      window.parent.postMessage(params, '*');
    }
  }

  private isValidString(str: string | undefined): boolean {
    return !!str && str.trim() !== '';
  }

  private createDataLayerParams(event: string, category: string, label: string, action: string): DataLayerParams {
    return {
      event: 'datalayer',
      value: {
        event,
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        nonInteraction: false
      }
    };
  }
}
