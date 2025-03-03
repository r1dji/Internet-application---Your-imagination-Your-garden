import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posao } from '../models/posao';
import { Odrzavanje } from '../models/odrzavanje';
import { Usluga } from '../models/usluga';

@Injectable({
  providedIn: 'root'
})
export class PosloviService {

  constructor(private http: HttpClient) { }

  private readonly posloviUri = 'http://localhost:4000/poslovi'

  getAllZavrsene(): Observable<Posao[]> {
    return this.http.get<Posao[]>(`${this.posloviUri}/getAllZavrsene`);
  }

  getAllZavrZak(): Observable<Posao[]> {
    return this.http.get<Posao[]>(`${this.posloviUri}/getAllZavrsZak`);
  }

  dohvatiSveUObrNeOdbili(firma: string, korIme: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/dohvatiSveUObrNeOdbili`, { firma: firma, korIme: korIme });
  }

  prihvatiPosao(idP: number, dekorater: string, datumZavrsetka: string, firma: string): Observable<string> {
    return this.http.post<string>(`${this.posloviUri}/prihvatiPosao`, { idP: idP, dekorater: dekorater, datumZavrsetka: datumZavrsetka });
  }

  odbaciPosao(idP: number, dekorater: string): Observable<string> {
    return this.http.post<string>(`${this.posloviUri}/odbaciPosao`, { idP: idP, dekorater: dekorater });
  }

  getAllZakazaneZaDekoratera(dekorater: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZakazaneZaDekoratera`, { dekorater: dekorater });
  }

  getAllZavrseneIZakazaneZaFirmu(firma:string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZavrseneIZakazaneZaFirmu`, { firma: firma});
  }

  getAllZaVlasnika(vlasnik: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZaVlasnika`, { vlasnik: vlasnik })
  }

  getAllZaVlasnikaObradjene(vlasnik: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZaVlasnikaObradjene`, { vlasnik: vlasnik });
  }

  zavrsiPosao(posao: Posao): Observable<string> {
    return this.http.post<string>(`${this.posloviUri}/zavrsiPosao`, { idp: posao.IdP })
  }

  getAllZakazaneIUObrZaVlasnika(vlasnik: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZakazaneIUObrZaVlasnika`, { vlasnik: vlasnik });
  }

  getAllZavrseneZaVlasnika(vlasnik: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZavrseneZaVlasnika`, { vlasnik: vlasnik });
  }

  getAllZavrseneZaDekorater(dekorater: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZavrseneZaDekorater`, { dekorater: dekorater })
  }

  getAllZavrseneZaFirmu(firma: string): Observable<Posao[]> {
    return this.http.post<Posao[]>(`${this.posloviUri}/getAllZavrseneZaFirmu`, { firma: firma });
  }

  dodajPosao(firma: string, vlasnik: string, datumRada: string, tipBaste: string,
    kvadraturaBazenPrivBasta: number, kvadraturaZeleniloPrivBasta: number, kvadraturaLezaljkeStoloviPrivBasta: number,
    kvadraturaFontanaRestBasta: number, kvadraturaZeleniloRestBasta: number, brojStolovaStolicaRestBasta: number,
    usluge: Usluga[], brVodenihPovrs: number
  ): Observable<string> {
    const data = {
      firma: firma,
      vlasnik: vlasnik,
      datumRada: datumRada,
      tipBaste: tipBaste,
      kvadraturaBazen: kvadraturaBazenPrivBasta,
      kvadraturaZeleniloPrivBasta: kvadraturaZeleniloPrivBasta,
      kvadrLezStol: kvadraturaLezaljkeStoloviPrivBasta,
      kvadraturaFontRestBasta: kvadraturaFontanaRestBasta,
      kvadraturaZeleniloRestBasta: kvadraturaZeleniloRestBasta,
      brojStolovaRestBasta: brojStolovaStolicaRestBasta,
      usluge: usluge,
      brVodenihPovrs: brVodenihPovrs
    }
    return this.http.post<string>(`${this.posloviUri}/dodajPosao`, data)
  }

}
