import { environment } from 'src/environments/environment';
import { GoogleDatalayerService } from './../../core/services/google-datalayer.service';
import { ActionService } from './../../core/services/action.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Showroom } from 'src/app/core/model/lbok.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClusterIconStyle, MarkerClustererOptions } from '@angular/google-maps';
const startCenter: google.maps.LatLngLiteral = { lat: 51.91943799999999, lng: 19.14513599999998 };
@Component({
  selector: 'dmg-main-map',
  templateUrl: './main-map.component.html'
})
export class MainMapComponent implements OnInit, OnDestroy {
  @ViewChild('map', { static: false }) public mapElement: any;
  @Input() public lbokList!: Array<Showroom>;
  public apiLoaded: Observable<boolean>;
  public center: google.maps.LatLngLiteral = startCenter;
  public zoom = 6;
  public apiUrl: string = environment.api_url;
  public markerClustererImagePath = `${this.apiUrl}/assets/images/icons/marker-group-violet.png`;

  public showroomSubscription!: Subscription;
  public centerSubscription!: Subscription;
  public mapHeight: string = '750px';
  public clusterStyle: Array<ClusterIconStyle> = [
    {
      height: 60,
      width: 60,
      url: this.markerClustererImagePath,
      textColor: '#fff',
      fontFamily: 'tahoma, sans-serif',
      textSize: 12,
      className: 'lboki-cluster'
    },
    {
      height: 60,
      width: 60,
      url: this.markerClustererImagePath,
      textColor: '#fff',
      fontFamily: 'tahoma, sans-serif',
      textSize: 11,
      className: 'lboki-cluster'
    },
    {
      height: 60,
      width: 60,
      url: this.markerClustererImagePath,
      textColor: '#fff',
      fontFamily: 'tahoma, sans-serif',
      textSize: 9,
      className: 'lboki-cluster'
    },
    {
      height: 60,
      width: 60,
      url: this.markerClustererImagePath,
      textColor: '#fff',
      fontFamily: 'tahoma, sans-serif',
      textSize: 8,
      className: 'lboki-cluster'
    }
  ];
  public options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 18,
    minZoom: 6
  };
  private timeout?: ReturnType<typeof setTimeout>;

  constructor(
    httpClient: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private actionService: ActionService,
    private googleData: GoogleDatalayerService
  ) {
    if (window.outerWidth < 992) {
      this.mapHeight = '550px';
    }

    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=?????' +
          '&sensor=true&libraries=geometry',
        'callback'
      )
      .pipe(
        map(() => {
          window.navigator.geolocation.getCurrentPosition(position => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.zoom = 14;
          });
          return true;
        }),
        catchError(() => of(false))
      );
  }

  public ngOnInit(): void {
    this.showroomSubscription = this.actionService.choosedShowroom.subscribe(item => {
      if (item) {
        const multipleCities = this.lbokList.filter(i => i.city === item.city);
        if (multipleCities.length > 1) {
          this.focusOnCityGroup(multipleCities);
        } else {
          this.focusOnCity(item);
        }
      } else {
        this.resetFocus();
      }
    });

    this.centerSubscription = this.actionService.centerOnMap.subscribe(item => {
      if (item) {
        this.center = item.latlng;
        this.onZoomChanged();
      } else {
        this.center = startCenter;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.showroomSubscription) {
      this.showroomSubscription.unsubscribe();
    }
  }
  public resetFocus(): void {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(this.center));
    this.mapElement.fitBounds(bounds);
    this.zoom = 6;
  }

  public focusOnCity(item: Showroom): void {
    const places = item;

    if (!places.latlng) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(places.latlng));
    this.mapElement.fitBounds(bounds);
    this.zoom = 18;
  }
  public focusOnCityGroup(multipleCities: Array<Showroom>): void {
    const cityBounds = new google.maps.LatLngBounds();

    multipleCities.forEach(item => {
      cityBounds.extend(new google.maps.LatLng(item.latlng));
    });

    this.mapElement.fitBounds(cityBounds);
    this.zoom = 14;
  }

  public openModal(marker: Showroom): void {
    this.googleData.dataLayerMarkerClick(marker.city, marker.street);
    this.actionService.setMarkerShowroom(marker);
    this.ngxSmartModalService.getModal('myModal').open();
  }

  public onZoomChanged(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const bounds = this.mapElement.getBounds();
      const newList = this.lbokList.filter(m => bounds.contains(m.latlng));
      this.actionService.filterListByZoom(newList);
      this.calculateNearestShowrooms();
    }, 200);
  }

  private calculateNearestShowrooms() {
    const location = this.mapElement.getCenter();
    const centerLatLang: google.maps.LatLngLiteral = {
      lat: location.lat(),
      lng: location.lng()
    };
    this.lbokList.forEach(item => {
      const cpos = google.maps.geometry.spherical.computeDistanceBetween(centerLatLang, item.latlng);
      item.distance = cpos;
    });
    const sorted = Array.from(this.lbokList)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
    this.actionService.setNearestShowroomList(sorted);
  }
}
