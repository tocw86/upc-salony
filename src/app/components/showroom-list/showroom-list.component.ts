import { Subscription } from 'rxjs';
import { ActionService } from './../../core/services/action.service';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Showroom } from 'src/app/core/model/lbok.model';

@Component({
  selector: 'dmg-showroom-list',
  templateUrl: './showroom-list.component.html'
})
export class ShowroomListComponent implements OnInit, OnDestroy {
  @Input() public lbokList!: Array<Showroom>;
  @ViewChild('scrollList', { static: false }) public scrollList!: ElementRef;
  public showroomSelectSubscription!: Subscription;
  public clearPageCounterSubscription!: Subscription;
  public googleMapZoomSubscription!: Subscription;
  public nearesetShowroomsSubscription!: Subscription;
  public selectedShowroom!: Showroom | null;
  public pageCounter = 3;
  public scrolling = false;
  public lastScrollTop = 0;
  public isZoomedListIsEmpty = false;
  public nearestShowrooms!: Array<Showroom>;
  private timeout?: ReturnType<typeof setTimeout>;
  constructor(private actionService: ActionService) {}

  public ngOnInit(): void {
    this.showroomSelectSubscription = this.actionService.choosedShowroom.subscribe(item => {
      this.selectedShowroom = item;
    });
    this.clearPageCounterSubscription = this.actionService.clearLazyLoad.subscribe(val => {
      if (val) {
        this.resetPageCounter();
      }
    });
    this.googleMapZoomSubscription = this.actionService.googleMapZoomChange.subscribe(list => {
      this.lbokList = list;
      this.isZoomedListIsEmpty = this.lbokList.length === 0;
      this.resetPageCounter();
    });
    this.nearesetShowroomsSubscription = this.actionService.nearestShowrooms.subscribe(list => {
      this.nearestShowrooms = list;
    });
  }

  public onScrollLoadData(event: Event): void {
    this.scrolling = true;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const st = this.scrollList.nativeElement.scrollTop;
      if (st > this.lastScrollTop) {
        this.pageCounter++;
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
      this.scrolling = false;
    }, 100);
  }

  public ngOnDestroy(): void {
    this.showroomSelectSubscription?.unsubscribe();
    this.clearPageCounterSubscription?.unsubscribe();
    this.googleMapZoomSubscription?.unsubscribe();
    this.nearesetShowroomsSubscription?.unsubscribe();
  }

  private resetPageCounter(): void {
    this.pageCounter = 3;
  }
}
