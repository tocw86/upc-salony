import { Component, Input, OnInit } from '@angular/core';
import { Showroom } from 'src/app/core/model/lbok.model';
import { ActionService } from './../../core/services/action.service';
import { GoogleDatalayerService } from './../../core/services/google-datalayer.service';

@Component({
  selector: 'dmg-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {
  @Input() public lbokList!: Showroom[];
  public selectedCity: Showroom | null = null;

  constructor(private actionService: ActionService, private googleDataLayerService: GoogleDatalayerService) {}

  public get uniqueCities(): Showroom[] {
    return this.lbokList.filter((value, index, self) => index === self.findIndex(t => t.city === value.city));
  }

  public ngOnInit(): void {}

  public citySelected(): void {
    this.googleDataLayerService.dataLayerSelectClick(this.selectedCity?.city);
    this.actionService.setShowroom(this.selectedCity);
  }

  public resetMap(): void {
    this.selectedCity = null;
  }
}
