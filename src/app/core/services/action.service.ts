import { Showroom } from './../model/lbok.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public choosedShowroom: Subject<Showroom | null> = new Subject<Showroom | null>();
  public markerChoosedShowroom: Subject<Showroom | null> = new Subject<Showroom | null>();
  public clearLazyLoad: Subject<boolean> = new Subject<boolean>();
  public googleMapZoomChange: Subject<Array<Showroom>> = new Subject<Array<Showroom>>();
  public nearestShowrooms: Subject<Array<Showroom>> = new Subject<Array<Showroom>>();
  public centerOnMap: Subject<Showroom | null> = new Subject<Showroom | null>();

  constructor() {}

  public setShowroom(showroom: Showroom | null): void {
    this.choosedShowroom.next(showroom);
  }
  public setMarkerShowroom(showroom: Showroom): void {
    this.markerChoosedShowroom.next(showroom);
  }

  public clearLazyLoadVar(): void {
    this.clearLazyLoad.next(true);
  }

  public filterListByZoom(lbokList: Array<Showroom>): void {
    this.googleMapZoomChange.next(lbokList);
  }

  public setNearestShowroomList(lbokList: Array<Showroom>): void {
    this.nearestShowrooms.next(lbokList);
  }

  public setCenterOnMap(showroom: Showroom): void {
    this.centerOnMap.next(showroom);
  }
}
