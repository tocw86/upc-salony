import { ActivePipe } from './shared/pipes/active.pipe';
import { CityPipe } from './shared/pipes/city.pipe';
import { ReplacePipe } from './shared/pipes/replace.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SelectCityComponent } from './components/select-city/select-city.component';
import { ShowroomListComponent } from './components/showroom-list/showroom-list.component';
import { MainMapComponent } from './components/main-map/main-map.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { MarkerModalComponent } from './components/marker-modal/marker-modal.component';
import { ShowroomItemComponent } from './components/showroom-item/showroom-item.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NearestItemComponent } from './components/nearest-item/nearest-item.component';
@NgModule({
  declarations: [
    AppComponent,
    SelectCityComponent,
    ShowroomListComponent,
    MainMapComponent,
    MarkerModalComponent,
    ShowroomItemComponent,
    ReplacePipe,
    CityPipe,
    ActivePipe,
    NearestItemComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    BrowserModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxSmartModalModule.forRoot(),
    NgxSpinnerModule,
    AngularResizeEventModule
  ],
  providers: [ReplacePipe, CityPipe, ActivePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
