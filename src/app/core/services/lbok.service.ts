import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Voyager } from '../model/voyager.model';
import { Handicap } from '../model/lbok.model';

export const handicaps: Handicap[] = [
  {
    src: 'images/handicaps/handicap-induction-loop.svg',
    alt: 'Stanowisko wyposażone w pętlę indukcyjną',
    title: 'Pętla indukcyjna',
    name: ''
  },
  {
    name: 'handicap-generic',
    src: 'images/handicaps/handicap-generic.svg',
    alt: 'Stanowisko przystosowane do obsługi osób niepełnosprawnych',
    title: 'Obsługa osób niepełnosprawnych'
  },
  {
    name: 'handicap-online-translation',
    src: 'images/handicaps/handicap-online-translation.svg',
    alt:
      'Stanowisko wyposażone w urządzenie umożliwiające kontakt z osobą niesłyszącą lub niemówiącą. ' +
      'Możliwość komunikacji audiowizualnej w czasie rzeczywistym dla osób niesłyszących - tłumacz on-line',
    title: 'Komunikacja audiowizualna on-line'
  },
  {
    name: 'handicap-sign-language',
    src: 'images/handicaps/handicap-sign-language.svg',
    alt: 'Stanowisko przystosowane do obsługi osób niesłyszących i niemówiących (język migowy)',
    title: 'Język migowy'
  }
];
@Injectable({
  providedIn: 'root'
})
export class LbokService {
  private configUrl = environment.voyager_url;

  constructor(private http: HttpClient) {}

  public getLbokList(): Observable<Voyager> {
    return this.http.get<Voyager>(`${this.configUrl}/list`);
  }
}
