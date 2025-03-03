import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  constructor(private http: HttpClient) { }

  private readonly korisniciUri: string = 'http://localhost:4000/korisnici'

  login(korisnicko_ime: string, lozinka: string, logintip: string): Observable<Korisnik> {
    const data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka,
      logintip: logintip
    }
    return this.http.post<Korisnik>(`${this.korisniciUri}/login`, data);
  }

  getUserByUsername(korime: string): Observable<Korisnik> {
    return this.http.get<Korisnik>(`${this.korisniciUri}/getUserByUsername?korime=`+korime);
  }

  getUserByEmail(email: string): Observable<Korisnik> {
    return this.http.get<Korisnik>(`${this.korisniciUri}/getUserByEmail?email=`+email);
  }

  registerKorisnik(korIme: string, lozinka: string, ime: string, prezime: string, pol: string, adresa: string,
    telefon: string, email: string, profSlika: string, brKartice: string, tip: string, status: string, firma: string): Observable<string> {

    const data = {
      korIme: korIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      pol: pol,
      adresa: adresa,
      telefon: telefon,
      email: email,
      profSlika: profSlika,
      brKartice: brKartice,
      tip: tip,
      status: status,
      firma: firma
    }
    return this.http.post<string>(`${this.korisniciUri}/registerKorisnik`, data);
  }

  promeniLozinku(korIme: string, staraLozinka: string, novaLozinka: string): Observable<string> {
    const data = {
      korIme: korIme,
      staraLozinka: staraLozinka,
      novaLozinka: novaLozinka
    }
    console.log(korIme, + " " + staraLozinka + " " + novaLozinka)
    return this.http.post<string>(`${this.korisniciUri}/promeniLozinku`, data);
  }

  getAllPoTipu(tip: string): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.korisniciUri}/getAllPoTipu?tip=`+tip);
  }

  getAllDekorZaFirmu(firma: string): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.korisniciUri}/getAllDekorZaFirmu?firma=`+firma);
  }

  getUObradi(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.korisniciUri}/getUObradi`);
  }

  promeniStatus(korisnik: string, statusN: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniStatus`, { korIme: korisnik, statusN: statusN });
  }

  getAllNoAdmin(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.korisniciUri}/getAllNoAdmin`);
  }

  promeniSliku(korisnik: string, slikaNova: string): Observable<string> {
    console.log(korisnik)
    console.log(slikaNova)
    return this.http.post<string>(`${this.korisniciUri}/promeniProfSliku`, { korIme: korisnik, novaSlika: slikaNova });
  }

  promeniKorIme(korisnik: string, korImeNovo: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniKorIme`, { korIme: korisnik, korImeNovo: korImeNovo });
  }

  promeniIme(korisnik: string, imeNovo: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniIme`, { korIme: korisnik, param: imeNovo });
  }

  promeniPrezime(korisnik: string, prezimeNovo: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniPrezime`, { korIme: korisnik, param: prezimeNovo });
  }

  promeniPol(korisnik: string, polNovi: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniPol`, { korIme: korisnik, param: polNovi });
  }

  promeniAdresu(korisnik: string, adresaNova: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniAdresu`, { korIme: korisnik, param: adresaNova });
  }

  promeniTelefon(korisnik: string, prezime: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniTelefon`, { korIme: korisnik, param: prezime });
  }

  promeniEmail(korisnik: string, email: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniEmail`, { korIme: korisnik, param: email });
  }

  promeniBrKartice(korisnik: string, brKartice: string): Observable<string> {
    return this.http.post<string>(`${this.korisniciUri}/promeniBrKartice`, { korIme: korisnik, param: brKartice });
  }

  promeniLozinkuAdmin(korIme: string, staraLozinka: string, novaLozinka: string): Observable<string> {
    const data = {
      korIme: korIme,
      staraLozinka: staraLozinka,
      novaLozinka: novaLozinka
    }
    console.log(korIme, + " " + staraLozinka + " " + novaLozinka)
    return this.http.post<string>(`${this.korisniciUri}/promeniLozinkuAdmin`, data);
  }

  getAllIstaFirma(firma: string): Observable<Korisnik[]> {
    return this.http.post<Korisnik[]>(`${this.korisniciUri}/getAllIstaFirma`, { firma: firma })
  }

}
