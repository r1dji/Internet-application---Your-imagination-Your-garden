import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PosloviService } from '../services/poslovi.service';
import { Posao } from '../models/posao';
import { Firma } from '../models/firma';
import { FirmeService } from '../services/firme.service';

@Component({
  selector: 'app-pocetnastrana',
  templateUrl: './pocetnastrana.component.html',
  styleUrls: ['./pocetnastrana.component.css']
})
export class PocetnastranaComponent {

  constructor(private korisniciServis: KorisniciService, private router: Router, private posloviServis: PosloviService,
    private firmeServis: FirmeService
  ) { }

  korisnicko_ime: string = ''
  lozinka: string = ''
  message: string = ''

  login(): void {
    if (this.korisnicko_ime != '' && this.lozinka != '') {
      this.korisniciServis.login(this.korisnicko_ime, this.lozinka, 'normallogin').subscribe(
        korisnik => {
          if (korisnik != null) {
            if (korisnik.status == 'aktivan') {
              localStorage.setItem('logged', korisnik.korisnicko_ime);
              if (korisnik.tip == 'vlasnik') {
                this.router.navigate(['vlasnik'])
              } else if (korisnik.tip == 'dekorater') {
                this.router.navigate(['dekorater'])
              }
            } else if (korisnik.status == 'u obradi') {
              this.message = 'Vaš zahtev je u obradi.'
            } else if (korisnik.status == 'blokiran') {
              this.message = 'Nažalost, Vaš nalog je blokiran ili je Vaš zahtev odbijen. Budite slobodni da nas kontaktirate za više informacija.'
            }
          } else {
            this.message = 'Ne postoji korisnik za unete podatke. Proverite da li ste dobro uneli korisničko ime i lozinku.'
          }
        }
      )
    } else {
      this.message = 'Unesite korisničko ime i lozinku';
    }

  }

  vlasnici: Korisnik[] = []
  dekorateri: Korisnik[] = []
  posloviZavrseni: Posao[] = []
  poslovi: Posao[] = []
  posloviZak24h: Posao[] = []
  posloviZak7d: Posao[] = []
  posloviZak30d: Posao[] = []

  firme: Firma[] = []

  ngOnInit(): void {
    this.korisniciServis.getAllPoTipu('vlasnik').subscribe(
      vlasnici => {
        this.vlasnici = vlasnici;
      }
    )
    this.korisniciServis.getAllPoTipu('dekorater').subscribe(
      dekorateri => {
        this.dekorateri = dekorateri;
      }
    )
    this.posloviServis.getAllZavrsene().subscribe(
      pos => {
        this.posloviZavrseni = pos;
      }
    )
    this.posloviServis.getAllZavrZak().subscribe(
      pos => {
        this.posloviZak24h.length = 0;
        this.posloviZak7d.length = 0;
        this.posloviZak30d.length = 0;
        this.poslovi = pos;
        const milisIn24Hours = 1000 * 60 * 60 * 24;
        const milisIn7Days = 1000 * 60 * 60 * 24 * 7;
        const milisIn30Days = 1000 * 60 * 60 * 24 * 30;
        for (let i = 0; i < this.poslovi.length; i++) {
          if (Math.abs((new Date(this.poslovi[i].datumZakazivanja)).getTime() - (new Date()).getTime()) < milisIn24Hours) {
            this.posloviZak24h.push(this.poslovi[i]);
          }
          if (Math.abs((new Date(this.poslovi[i].datumZakazivanja)).getTime() - (new Date()).getTime()) < milisIn7Days) {
            this.posloviZak7d.push(this.poslovi[i]);
          }
          if (Math.abs((new Date(this.poslovi[i].datumZakazivanja)).getTime() - (new Date()).getTime()) < milisIn30Days) {
            this.posloviZak30d.push(this.poslovi[i]);
          }
        }
      }
    )
    this.firmeServis.getAll().subscribe(
      f => {
        this.firme = f;
        for (let i = 0; i < this.firme.length; i++) {
          this.firme[i].zaposleni = []
          this.korisniciServis.getAllDekorZaFirmu(this.firme[i].naziv).subscribe(
            dekorateri => {
              let ime_prez: string = ''
              for (let j = 0; j < dekorateri.length; j++) {
                ime_prez = dekorateri[j].ime + ' ' + dekorateri[j].prezime
                this.firme[i].zaposleni.push(ime_prez);
              }
            }
          )
        }
        this.firmePretrazene = this.firme;
      }
    )
  }


  nazivFirme: string = ''
  adresaFirme: string = ''

  opcijaSort: string = ''

  sortirajFirme(): void {
    if (this.opcijaSort == 'nosort') {
      this.pretraziFirmu();
    } else if (this.opcijaSort == 'sortNazivRas') {
      this.firmePretrazene.sort((f1: Firma, f2: Firma) => {
        if (f1.naziv > f2.naziv) {
          return 1;
        } else if (f1.naziv < f2.naziv) {
          return -1;
        } else {
          return 0;
        }
      })
    } else if (this.opcijaSort == 'sortNazivOpa') {
      this.firmePretrazene.sort((f1: Firma, f2: Firma) => {
        if (f1.naziv < f2.naziv) {
          return 1;
        } else if (f1.naziv > f2.naziv) {
          return -1;
        } else {
          return 0;
        }
      })
    } else if (this.opcijaSort == 'sortAdresRas') {
      this.firmePretrazene.sort((f1: Firma, f2: Firma) => {
        if (f1.adresa > f2.adresa) {
          return 1;
        } else if (f1.adresa < f2.adresa) {
          return -1;
        } else {
          return 0;
        }
      })
    } else if (this.opcijaSort == 'sortAdresOpa') {
      this.firmePretrazene.sort((f1: Firma, f2: Firma) => {
        if (f1.adresa < f2.adresa) {
          return 1;
        } else if (f1.adresa > f2.adresa) {
          return -1;
        } else {
          return 0;
        }
      })
    }
  }

  firmePretrazene: Firma[] = []

  pretraziFirmu(): void {
    this.firmePretrazene = [];
    for (let i = 0; i < this.firme.length; i++) {
      if (this.firme[i].naziv.toLowerCase().includes(this.nazivFirme) &&
          this.firme[i].adresa.toLowerCase().includes(this.adresaFirme)) {
            this.firmePretrazene.push(this.firme[i]);
          }
    }
  }

}
