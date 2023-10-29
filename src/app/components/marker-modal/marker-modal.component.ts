import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActionService } from './../../core/services/action.service';
import { Showroom } from './../../core/model/lbok.model';
import { environment } from 'src/environments/environment';
import { generateHandicaps, phoneFormatted } from 'src/app/shared/utils/utils';

@Component({
  selector: 'dmg-marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.scss']
})
export class MarkerModalComponent implements OnInit, OnDestroy {
  public showroom: Showroom | null = null;
  public showroomSubscription!: Subscription;
  public apiUrl: string = environment.api_url;

  constructor(private actionService: ActionService) {}

  public get googleHref(): string | null {
    if (this.showroom?.latlng) {
      const ll = `${this.showroom.latlng.lat},${this.showroom.latlng.lng}`;
      return `//maps.google.com?saddr=Current+Location&daddr=${ll}&ll=${ll}&z=16`;
    } else {
      return null;
    }
  }

  public get phoneFormatted(): string {
    return phoneFormatted(this.showroom?.phone);
  }

  public get generateHandicaps(): string {
    if (this.showroom?.flags) {
      return generateHandicaps(this.showroom.flags, this.apiUrl);
    }
    return '';
  }

  public get extraLine(): string | null {
    if (!this.showroom) {
      return null;
    }

    const extraLine = [];
    if (this.showroom.title.toLowerCase().includes('punkt sprzedaży')) {
      extraLine.push('- Punkt nie przyjmuje zwrotu sprzętu');
    }
    if (this.showroom.flags.includes('salon-bez-zwrotu')) {
      extraLine.push('- Salon nie przyjmuje zwrotu sprzętu');
    }
    if (this.showroom.flags.includes('sferis')) {
      extraLine.push('- Punkt ten zajmuje się tylko sprzedażą usług UPC');
    }

    return extraLine.length ? `<p class="info-label">Uwaga</p><p>${extraLine.join('<br/>')}</p>` : null;
  }

  public ngOnInit(): void {
    this.showroomSubscription = this.actionService.markerChoosedShowroom.subscribe(item => {
      this.showroom = item;
    });
  }

  public ngOnDestroy(): void {
    this.showroomSubscription?.unsubscribe();
  }
}
