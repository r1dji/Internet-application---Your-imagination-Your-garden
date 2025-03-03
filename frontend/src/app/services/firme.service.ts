import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firma } from '../models/firma';
import { Usluga } from '../models/usluga';

@Injectable({
  providedIn: 'root'
})
export class FirmeService {

  constructor(private http: HttpClient) { }

  private readonly firmeUri = 'http://localhost:4000/firme'

  getAll(): Observable<Firma[]> {
    return this.http.get<Firma[]>(`${this.firmeUri}/getAll`);
  }

  pretrazi(nazivParam: string, adresaParam: string): Observable<Firma[]> {
    return this.http.post<Firma[]>(`${this.firmeUri}/pretrazi`, { nazivParam: nazivParam, adresaParam: adresaParam });
  }

  dodajFirmu(naziv: string, adresa: string, telefon: string, kontaktOsoba: string, datumPocOdmora: Date | null, datumKrajOdmora: Date | null,
    usluge: Usluga[]
  ): Observable<string> {
    const data = {
      naziv: naziv,
      adresa: adresa,
      kontaktOsoba: kontaktOsoba,
      telefon: telefon,
      datumPocOdmora: datumPocOdmora,
      datumKrajOdmora: datumKrajOdmora,
      usluge: usluge
    }
    return this.http.post<string>(`${this.firmeUri}/dodajFirmu`, data);
  }

  getFirmByName(naziv: string): Observable<Firma> {
    return this.http.post<Firma>(`${this.firmeUri}/getFirmByName`, { naziv: naziv })
  }

  promeniNaziv(firma: string, param: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniNaziv`, { nazivFirme: firma, param: param });
  }

  promeniAdresu(firma: string, param: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniAdresu`, { nazivFirme: firma, param: param });
  }

  promeniOcenu(firma: string, param: number | null): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniOcenu`, { nazivFirme: firma, param: param });
  }

  promeniTelefon(firma: string, param: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniTelefon`, { nazivFirme: firma, param: param });
  }

  promeniKontaktOsobu(firma: string, param: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniKontaktOsobu`, { nazivFirme: firma, param: param });
  }

  promeniDatumPocOdmora(firma: string, param: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniDatPocOdmora`, { nazivFirme: firma, param: param });
  }

  promeniDatumKrajaOdmora(firma: string, param: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniDatKrajOdmora`, { nazivFirme: firma, param: param });
  }

  promeniNazivUsluge(firma: string, param: string, nazivUsluge: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniNazivUsluge`, { nazivFirme: firma, nazivUsluge: nazivUsluge, param: param });
  }

  promeniCenuUsluge(firma: string, param: number, nazivUsluge: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/promeniCenuUsluge`, { nazivFirme: firma, nazivUsluge: nazivUsluge, param: param });
  }

  obrisiKomentar(firma: string, korisnik: string, sadrzaj: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/obrisiKomentar`, { nazivFirme: firma, param: korisnik, sadrzaj: sadrzaj });
  }

  dodajUslugu(firma: string, nazivUsluge: string, cena: number): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/dodajUslugu`, { firma: firma, nazivUsluge: nazivUsluge, cenaUsluge: cena });
  }

  dodajKomentar(firma: string, korisnik: string, sadrzaj: string): Observable<string> {
    return this.http.post<string>(`${this.firmeUri}/dodajKomentar`, { firma: firma, korisnik: korisnik, sadrzaj: sadrzaj });
  }

}
