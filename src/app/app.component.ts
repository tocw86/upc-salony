import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LbokService } from './core/services/lbok.service';
import { Showroom } from './core/model/lbok.model';
import { Voyager } from './core/model/voyager.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'dmg-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public lbokList: Showroom[] = [];
  private listSubscription: Subscription = new Subscription();
  private timeoutId?: number;

  constructor(private lbokService: LbokService, private spinner: NgxSpinnerService) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.listSubscription.add(
      this.lbokService.getLbokList().subscribe({
        next: (item: Voyager) => {
          this.lbokList = item.data;
          this.spinner.hide();
        },
        error: () => this.spinner.hide()
      })
    );
  }

  public ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  public onResized(event: ResizedEvent): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => this.handleResize(event.newRect.height), 200);
  }

  private handleResize(newHeight: number): void {
    if (window.parent) {
      const params = {
        event: 'resize-iframe',
        height: window.outerWidth > 992 ? 915 : newHeight
      };
      window.parent.postMessage(params, '*');
    }
  }
}
