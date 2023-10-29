import { Component, Input, OnInit } from '@angular/core';
import { Showroom } from 'src/app/core/model/lbok.model';
import { handicaps } from 'src/app/core/services/lbok.service';
import { ActionService } from './../../core/services/action.service';
import { GoogleDatalayerService } from './../../core/services/google-datalayer.service';
import { environment } from './../../../environments/environment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { generateHandicaps, phoneFormatted } from 'src/app/shared/utils/utils';

@Component({
  selector: 'dmg-showroom-item',
  templateUrl: './showroom-item.component.html'
})
export class ShowroomItemComponent implements OnInit {
  @Input() public showroom?: Showroom;
  public apiUrl: string = environment.api_url;

  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private actionService: ActionService,
    private googleService: GoogleDatalayerService
  ) {}

  public get phoneFormatted(): string {
    return phoneFormatted(this.showroom?.phone);
  }

  public get generateHandicaps(): string {
    if (this.showroom?.flags) {
      return generateHandicaps(this.showroom.flags, this.apiUrl);
    }
    return '';
  }

  public ngOnInit(): void {}

  public openModal(): void {
    if (this.showroom) {
      this.googleService.dataLayerMarkerClick(this.showroom?.city, this.showroom?.street);
      this.actionService.setMarkerShowroom(this.showroom);
      this.ngxSmartModalService.getModal('myModal').open();
    }
  }
}
