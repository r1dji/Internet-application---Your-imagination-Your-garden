import { Component } from '@angular/core';
import { OdrzavanjaService } from '../services/odrzavanja.service';
import { Odrzavanje } from '../models/odrzavanje';
import { KorisniciService } from '../services/korisnici.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-dekorater-odrzavanja',
  templateUrl: './dekorater-odrzavanja.component.html',
  styleUrls: ['./dekorater-odrzavanja.component.css']
})
export class DekoraterOdrzavanjaComponent {

  constructor (private odrzavanjaServis: OdrzavanjaService, private korisniciServis: KorisniciService) { }

  neobrOdrzavanja: Odrzavanje[] = []

  trenutniKorisnik: Korisnik = new Korisnik()

  ngOnInit(): void {
    let korImeTmp = localStorage.getItem('logged');
    if (korImeTmp != null) {
      this.korisniciServis.getUserByUsername(korImeTmp).subscribe(
        kor => {
          if (kor != null) {
            this.trenutniKorisnik = kor;
            this.odrzavanjaServis.getAllNeobOdrzavanjaZaFirmu(this.trenutniKorisnik.firma).subscribe(
              odrz => {
                this.neobrOdrzavanja = odrz;
                for (let i = 0; i < this.neobrOdrzavanja.length; i++) {
                  this.neobrOdrzavanja[i].datumZavrsetkaDate = new Date();
                  this.korisniciServis.getUserByUsername(this.neobrOdrzavanja[i].vlasnik).subscribe(
                    vlas => {
                      this.neobrOdrzavanja[i].vlasnikImePrezime = vlas.ime + " " + vlas.prezime
                    }
                  )
                }
              }
            )
          }
        }
      )
    }
  }

  prihvatiOdrzavanje(o: Odrzavanje): void {
    this.odrzavanjaServis.prihvatiOdrzavanje(o.IdO, this.trenutniKorisnik.korisnicko_ime, o.datumZavrsetka).subscribe(
      mess => {
        if (mess == 'ok') {
          this.ngOnInit();
        }
      }
    )
  }

  checkDatumZavrs(o: Odrzavanje): void {
    if (new Date(o.datumPravljenjaZahtevaOdrzavanja) > new Date(o.datumZavrsetkaPom) || new Date(o.datumZavrsetkaPom) < new Date()) {
      o.datumiErrorMess = 'Datum nije validan'
    } else {
      const datumPom: Date = new Date(o.datumZavrsetkaPom);
      o.datumZavrsetka = datumPom.getFullYear() + "-" + (datumPom.getMonth()+1) + "-" + datumPom.getDate()
      o.datumiErrorMess = ''
    }
  }

}
