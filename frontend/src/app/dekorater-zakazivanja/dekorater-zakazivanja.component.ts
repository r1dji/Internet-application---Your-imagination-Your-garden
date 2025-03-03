import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { PosloviService } from '../services/poslovi.service';
import { Korisnik } from '../models/korisnik';
import { Posao } from '../models/posao';

@Component({
  selector: 'app-dekorater-zakazivanja',
  templateUrl: './dekorater-zakazivanja.component.html',
  styleUrls: ['./dekorater-zakazivanja.component.css']
})
export class DekoraterZakazivanjaComponent {

  constructor(private korisniciServis: KorisniciService, private posloviServis: PosloviService) { }

  ngOnInit(): void {
    let korImeTmp = localStorage.getItem('logged')
    if (korImeTmp != null) {
      this.korisniciServis.getUserByUsername(korImeTmp).subscribe(
        kor => {
          if (kor != null) {
            this.trenutniKorisnik = kor;
            this.posloviServis.dohvatiSveUObrNeOdbili(this.trenutniKorisnik.firma, this.trenutniKorisnik.korisnicko_ime).subscribe(
              poslovi => {
                this.posloviNeobradjeni = poslovi;
                this.posloviNeobradjeni.sort((p1: Posao, p2: Posao) => {
                  if (p1.datumZakazivanja > p2.datumZakazivanja) {
                    return -1;
                  } else if (p1.datumZakazivanja < p2.datumZakazivanja) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                for (let i = 0; i < this.posloviNeobradjeni.length; i++) {
                  this.korisniciServis.getUserByUsername(this.posloviNeobradjeni[i].vlasnik).subscribe(
                    kor => {
                      this.posloviNeobradjeni[i].vlasnikImePrezime = kor.ime + " " + kor.prezime
                    }
                  )
                }
                this.posloviServis.getAllZakazaneZaDekoratera(this.trenutniKorisnik.korisnicko_ime).subscribe(
                  zakPos => {
                    this.prihvaceniPoslovi = zakPos;
                    for (let i = 0; i < this.prihvaceniPoslovi.length; i++) {
                      this.korisniciServis.getUserByUsername(this.prihvaceniPoslovi[i].vlasnik).subscribe(
                      kor => {
                        this.prihvaceniPoslovi[i].vlasnikImePrezime = kor.ime + " " + kor.prezime
                      })

                    }
                  }
                )
              }
            )
          }
        }
      )
    }
  }

  prihvaceniPoslovi: Posao[] = []

  zavrsiPosao(p: Posao): void {
    this.posloviServis.zavrsiPosao(p).subscribe(
      mess => {
        if (mess == 'ok') {
          this.ngOnInit();
        }
      }
    )
  }

  trenutniKorisnik: Korisnik = new Korisnik()
  posloviNeobradjeni: Posao[] = []

  prihvatiPosao(posao: Posao): void {
    this.posloviServis.prihvatiPosao(posao.IdP, this.trenutniKorisnik.korisnicko_ime, posao.datumZavrsetkaTMP, this.trenutniKorisnik.firma).subscribe(
      mess => {
        if (mess == 'ok') {
          this.ngOnInit();
        }
      }
    )
  }

  odbaciPosao(z: Posao): void {
    this.posloviServis.odbaciPosao(z.IdP, this.trenutniKorisnik.korisnicko_ime).subscribe(
      mess => {
        if (mess == 'ok') {
          this.ngOnInit();
        }
      }
    )
  }

  checkDatumZavrs(z: Posao): void {
    if (new Date(z.datumZavrsetkaTMP) < new Date(z.datumRada)) {
      z.datumiErrorMess = 'Datum završetka radova nije validan.'
    } else {
      z.datumiErrorMess = ''
    }
  }


}
