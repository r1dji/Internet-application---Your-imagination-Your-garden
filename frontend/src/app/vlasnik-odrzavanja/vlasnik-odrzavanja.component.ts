import { Component } from '@angular/core';
import { Posao } from '../models/posao';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';
import { PosloviService } from '../services/poslovi.service';
import { OdrzavanjaService } from '../services/odrzavanja.service';
import { Odrzavanje } from '../models/odrzavanje';

@Component({
  selector: 'app-vlasnik-odrzavanja',
  templateUrl: './vlasnik-odrzavanja.component.html',
  styleUrls: ['./vlasnik-odrzavanja.component.css']
})
export class VlasnikOdrzavanjaComponent {

  constructor(private korisniciServis: KorisniciService, private posloviServis: PosloviService,
    private odrzavanjaServis: OdrzavanjaService
  ) { }

  posloviZavrseni: Posao[] = []
  odrzavanjaUToku: Odrzavanje[] = []

  trenutniKorisnik: Korisnik = new Korisnik()

  ngOnInit(): void {
    this.posloviZavrseni.length = 0;
    this.odrzavanjaUToku.length = 0;

    let korImeTmp = localStorage.getItem('logged')
    if (korImeTmp != null) {
      this.korisniciServis.getUserByUsername(korImeTmp).subscribe(
        kor => {
          this.trenutniKorisnik = kor;
          this.posloviServis.getAllZavrseneZaVlasnika(this.trenutniKorisnik.korisnicko_ime).subscribe(
            pos => {
              for (let i = 0; i < pos.length; i++) {
                pos[i].mozeOdrzavanje = false;
              }
              this.posloviZavrseni = pos;
              for (let i = 0; i < this.posloviZavrseni.length; i++) {
                this.posloviZavrseni[i].odrzavanja = []
                this.odrzavanjaServis.getAllZaPosao(this.posloviZavrseni[i].IdP).subscribe(
                  odrz => {
                    let imaOdrzavanje: boolean = false;
                    for (let k = 0; k < odrz.length; k++) {
                      if (odrz[k].status == 'prihvacen' && new Date(odrz[k].datumZavrsetka) < new Date()) {
                        this.posloviZavrseni[i].odrzavanja.push(odrz[k]);
                      } else {
                        this.odrzavanjaUToku.push(odrz[k]);
                        if (new Date(odrz[k].datumZavrsetka) > new Date() || odrz[k].datumZavrsetka == "") {
                          imaOdrzavanje = true;
                        }
                      }
                    }
                    let sixMonhts: Date = new Date();
                    sixMonhts.setMonth((new Date()).getMonth() - 6)
                    if (new Date(this.posloviZavrseni[i].datumZavrsetka) < sixMonhts && !imaOdrzavanje) {
                      //let check: boolean = true;
                      for (let j = 0; j < this.posloviZavrseni[i].odrzavanja.length; j++) {
                        if (new Date(this.posloviZavrseni[i].odrzavanja[j].datumZavrsetka) > sixMonhts) {
                          this.posloviZavrseni[i].mozeOdrzavanje = true;
                          this.posloviZavrseni[i].notification = 'Trenutno nije moguće kreirati zahtev za održavanjem. Mogući razlozi su:\n\tPostoji zahtev koji je u obradi.\n\tNije prošlo 6 meseci od poslednjeg servisa.\n\tRadovi su u toku.'
                          break;
                        }
                      }
                    } else {
                      this.posloviZavrseni[i].mozeOdrzavanje = true;
                      this.posloviZavrseni[i].notification = 'Trenutno nije moguće kreirati zahtev za održavanjem. Mogući razlozi su:\n\tPostoji zahtev koji je u obradi.\n\tNije prošlo 6 meseci od poslednjeg servisa.\n\tRadovi su u toku.'
                    }
                  }
                )
              }
            }
          )
        }
      )
    }
  }

  zakaziOdrzavanje(p: Posao): void {
    this.odrzavanjaServis.zakaziOdrzavanje(p.IdP, p.firma, this.trenutniKorisnik.korisnicko_ime, p.brVodenihPovrsina).subscribe(
      mess => {
        if (mess == 'ok') {
          this.ngOnInit();
        }
      }
    )
  }
}
