import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearestItemComponent } from './nearest-item.component';
import { ActionService } from './../../core/services/action.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Showroom } from 'src/app/core/model/lbok.model';
import { createMockShowroom } from '../select-city/select-city.component.spec';

describe('NearestItemComponent', () => {
  let component: NearestItemComponent;
  let fixture: ComponentFixture<NearestItemComponent>;
  let actionServiceSpy: jasmine.SpyObj<ActionService>;
  let ngxSmartModalServiceSpy: jasmine.SpyObj<NgxSmartModalService>;

  beforeEach(async () => {
    const actionSvcSpy = jasmine.createSpyObj('ActionService', ['setMarkerShowroom', 'setCenterOnMap']);
    const ngxSmartModalSvcSpy = jasmine.createSpyObj('NgxSmartModalService', ['getModal']);

    await TestBed.configureTestingModule({
      declarations: [NearestItemComponent],
      providers: [
        { provide: ActionService, useValue: actionSvcSpy },
        { provide: NgxSmartModalService, useValue: ngxSmartModalSvcSpy }
      ]
    }).compileComponents();

    actionServiceSpy = TestBed.inject(ActionService) as jasmine.SpyObj<ActionService>;
    ngxSmartModalServiceSpy = TestBed.inject(NgxSmartModalService) as jasmine.SpyObj<NgxSmartModalService>;
    fixture = TestBed.createComponent(NearestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setMarkerShowroom and open the modal', () => {
    const modal = { open: jasmine.createSpy() };
    (ngxSmartModalServiceSpy as any).getModal.and.returnValue(modal);

    const showroom: Showroom = createMockShowroom();
    component.showroom = showroom;

    component.openModal();

    expect(actionServiceSpy.setMarkerShowroom).toHaveBeenCalledWith(showroom);
    expect(ngxSmartModalServiceSpy.getModal).toHaveBeenCalledWith('myModal');
  });
  it('should call setCenterOnMap with the showroom', () => {
    const showroom: Showroom = createMockShowroom();

    component.showroom = showroom;

    component.centerOnMarker();

    expect(actionServiceSpy.setCenterOnMap).toHaveBeenCalledWith(showroom);
  });
});
