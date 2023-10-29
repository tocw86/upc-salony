import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCityComponent } from './select-city.component';
import { Showroom } from 'src/app/core/model/lbok.model';
import { ActionService } from './../../core/services/action.service';
import { GoogleDatalayerService } from './../../core/services/google-datalayer.service';
export const createMockShowroom = (): Showroom => {
  const showroom = new Showroom();
  showroom.active = true;
  showroom.city = 'City1';
  showroom.cityGroup = 'Sample City Group';
  showroom.content = 'Some content here';
  showroom.email = 'email@example.com';
  showroom.flags = ['flag1', 'flag2'];
  showroom.handicap = false;
  showroom.image = 'image_url';
  showroom.isPlay = 1;
  showroom.latlng = { lat: 40.7128, lng: -74.006 };
  showroom.phone = '123-456-7890';
  showroom.pointsCount = 5;
  showroom.pointsDetails = 'Some point details here';
  showroom.specialInfo = 'Some special info here';
  showroom.street = '123 Sample St';
  showroom.title = 'Sample Showroom Title';
  showroom.options = {};
  showroom.distance = 10.5;
  return showroom;
};
describe('SelectCityComponent', () => {
  let component: SelectCityComponent;
  let fixture: ComponentFixture<SelectCityComponent>;
  let mockActionService: jasmine.SpyObj<ActionService>;
  let mockGoogleDatalayerService: jasmine.SpyObj<GoogleDatalayerService>;

  beforeEach(async () => {
    mockActionService = jasmine.createSpyObj('ActionService', ['setShowroom']);
    mockGoogleDatalayerService = jasmine.createSpyObj('GoogleDatalayerService', ['dataLayerSelectClick']);

    await TestBed.configureTestingModule({
      declarations: [SelectCityComponent],
      providers: [
        { provide: ActionService, useValue: mockActionService },
        { provide: GoogleDatalayerService, useValue: mockGoogleDatalayerService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCityComponent);
    component = fixture.componentInstance;
    const testList: Showroom[] = [createMockShowroom(), createMockShowroom(), createMockShowroom()];
    component.lbokList = testList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have unique cities', () => {
    expect(component.uniqueCities.length).toBe(1);
  });

  it('should select a city and call respective services', () => {
    component.selectedCity = createMockShowroom();
    component.citySelected();

    expect(mockGoogleDatalayerService.dataLayerSelectClick).toHaveBeenCalledWith('City1');
    expect(mockActionService.setShowroom).toHaveBeenCalledWith(component.selectedCity);
  });

  it('should reset selected city', () => {
    component.selectedCity = createMockShowroom();
    component.resetMap();

    expect(component.selectedCity).toBeNull();
  });
});
