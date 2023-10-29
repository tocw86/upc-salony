import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowroomItemComponent } from './showroom-item.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ActionService } from './../../core/services/action.service';
import { GoogleDatalayerService } from './../../core/services/google-datalayer.service';
import { createMockShowroom } from '../select-city/select-city.component.spec';
import { Showroom } from 'src/app/core/model/lbok.model';

describe('ShowroomItemComponent', () => {
  let component: ShowroomItemComponent;
  let fixture: ComponentFixture<ShowroomItemComponent>;
  let mockNgxSmartModalService: jasmine.SpyObj<NgxSmartModalService>;
  let mockActionService: jasmine.SpyObj<ActionService>;
  let mockGoogleService: jasmine.SpyObj<GoogleDatalayerService>;

  beforeEach(() => {
    // Prepare mock services
    mockNgxSmartModalService = jasmine.createSpyObj('NgxSmartModalService', ['getModal']);
    mockActionService = jasmine.createSpyObj('ActionService', ['setMarkerShowroom']);
    mockGoogleService = jasmine.createSpyObj('GoogleDatalayerService', ['dataLayerMarkerClick']);

    TestBed.configureTestingModule({
      declarations: [ShowroomItemComponent],
      providers: [
        { provide: NgxSmartModalService, useValue: mockNgxSmartModalService },
        { provide: ActionService, useValue: mockActionService },
        { provide: GoogleDatalayerService, useValue: mockGoogleService }
      ]
    });

    fixture = TestBed.createComponent(ShowroomItemComponent);
    component = fixture.componentInstance;
  });

  it('should format the phone numbers correctly', () => {
    const showroom: Showroom = createMockShowroom();
    showroom.phone = '123, 456';
    component.showroom = showroom;
    fixture.detectChanges();
    expect(component.phoneFormatted).toContain('tel:123');
    expect(component.phoneFormatted).toContain('tel:456');
  });

  it('should generate handicap HTML correctly', () => {
    const showroom: Showroom = createMockShowroom();
    showroom.flags = ['handicap-generic'];
    component.showroom = showroom;
    component.apiUrl = 'http://localhost:4200';
    fixture.detectChanges();
    expect(component.generateHandicaps).toContain('<img src="http://localhost:4200/assets/');
  });
  it('should call services on openModal', () => {
    const modal = { open: jasmine.createSpy() };
    (mockNgxSmartModalService as any).getModal.and.returnValue(modal);

    const showroom: Showroom = createMockShowroom();
    showroom.city = 'Test City';
    showroom.street = 'Test Street';

    component.showroom = showroom;
    component.openModal();

    expect(mockGoogleService.dataLayerMarkerClick).toHaveBeenCalledWith('Test City', 'Test Street');
    expect(mockActionService.setMarkerShowroom).toHaveBeenCalledWith(component.showroom);
    expect(modal.open).toHaveBeenCalled();
  });
});
