import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Odrzavanje } from '../models/odrzavanje';

@Injectable({
  providedIn: 'root'
})
export class OdrzavanjaService {

  constructor(private http: HttpClient) { }

  private readonly odrzavanjaUri = 'http://localhost:4000/odrzavanja'

  getAllNeobOdrzavanjaZaFirmu(firma: string): Observable<Odrzavanje[]> {
    return this.http.post<Odrzavanje[]>(`${this.odrzavanjaUri}/getAllNeobOdrzavanjaZaFirmu`, { firma: firma });
  }

  prihvatiOdrzavanje(idO: number, dekorater: string, datumZavrsetka: string): Observable<string> {
    return this.http.post<string>(`${this.odrzavanjaUri}/prihvatiOdrzavanje`, { idO: idO, dekorater: dekorater, datumZavrsetka: datumZavrsetka });
  }

  getAllPrihvaceneZaDekoratera(dekorater: string): Observable<Odrzavanje[]> {
    return this.http.post<Odrzavanje[]>(`${this.odrzavanjaUri}/getAllPrihvaceneZaDekoratera`, { dekorater: dekorater });
  }

  getAllPrihvaceneZaFirmu(firma: string): Observable<Odrzavanje[]> {
    return this.http.post<Odrzavanje[]>(`${this.odrzavanjaUri}/getAllPrihvaceneZaFirmu`, { firma: firma });
  }

  getAllZaPosao(idP: number): Observable<Odrzavanje[]> {
    return this.http.post<Odrzavanje[]>(`${this.odrzavanjaUri}/getAllZaPosao`, { idP: idP });
  }

  zakaziOdrzavanje(idP: number, firma: string, vlasnik: string, brVodenihPovrsina: number): Observable<string> {
    return this.http.post<string>(`${this.odrzavanjaUri}/kreirajOdrzavanje`, {  idP: idP, firma: firma, vlasnik: vlasnik, brVodenihPovrsina: brVodenihPovrsina })
  }
}
