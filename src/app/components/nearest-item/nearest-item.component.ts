import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from './../../../environments/environment';
import { ActionService } from './../../core/services/action.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Showroom } from 'src/app/core/model/lbok.model';
import { handicaps } from 'src/app/core/services/lbok.service';

@Component({
  selector: 'dmg-nearest-item',
  templateUrl: './nearest-item.component.html'
})
export class NearestItemComponent {
  @Input() public showroom!: Showroom;
  public apiUrl: string = environment.api_url;

  constructor(private ngxSmartModalService: NgxSmartModalService, private actionService: ActionService) {}

  public openModal(): void {
    this.actionService.setMarkerShowroom(this.showroom);
    this.ngxSmartModalService.getModal('myModal').open();
  }

  public centerOnMarker(): void {
    this.actionService.setCenterOnMap(this.showroom);
  }
}
