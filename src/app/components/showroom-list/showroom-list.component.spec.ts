import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject, Subject, of } from 'rxjs';
import { ActionService } from './../../core/services/action.service';
import { ShowroomListComponent } from './showroom-list.component';
import { Showroom } from 'src/app/core/model/lbok.model';
import { ElementRef } from '@angular/core';
import { createMockShowroom } from '../select-city/select-city.component.spec';
import { CityPipe } from 'src/app/shared/pipes/city.pipe';

describe('ShowroomListComponent', () => {
  let component: ShowroomListComponent;
  let fixture: ComponentFixture<ShowroomListComponent>;
  let mockActionService: Partial<ActionService>;

  beforeEach(async () => {
    // Create mock subjects
    mockActionService = {
      choosedShowroom: new ReplaySubject<Showroom | null>(1),
      clearLazyLoad: new Subject<boolean>(),
      googleMapZoomChange: new Subject<Showroom[]>(),
      nearestShowrooms: new Subject<Showroom[]>()
    };

    await TestBed.configureTestingModule({
      declarations: [ShowroomListComponent, CityPipe],
      providers: [{ provide: ActionService, useValue: mockActionService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowroomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to actionService methods on init', () => {
    const mockShowroom: Showroom = createMockShowroom();
    (mockActionService.choosedShowroom as Subject<Showroom | null>).next(mockShowroom);
    (mockActionService.clearLazyLoad as Subject<boolean>).next(true);
    (mockActionService.googleMapZoomChange as Subject<Showroom[]>).next([mockShowroom]);
    (mockActionService.nearestShowrooms as Subject<Showroom[]>).next([mockShowroom]);

    component.ngOnInit();
  });
  it('should increase pageCounter on scroll', fakeAsync(() => {
    spyOn(window, 'setTimeout');
    component.lbokList = [createMockShowroom(), createMockShowroom(), createMockShowroom()];
    const mockEvent = new Event('scroll');
    component.scrollList = {
      nativeElement: {
        scrollTop: 500
      }
    } as ElementRef;

    component.lastScrollTop = 0;
    component.onScrollLoadData(mockEvent);
    tick(200);
    expect(component.pageCounter).toBeGreaterThan(1);
  }));

  it('should unsubscribe on destroy', () => {
    spyOn(component.showroomSelectSubscription, 'unsubscribe');
    spyOn(component.clearPageCounterSubscription, 'unsubscribe');
    spyOn(component.googleMapZoomSubscription, 'unsubscribe');
    spyOn(component.nearesetShowroomsSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.showroomSelectSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.clearPageCounterSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.googleMapZoomSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.nearesetShowroomsSubscription.unsubscribe).toHaveBeenCalled();
  });
});
