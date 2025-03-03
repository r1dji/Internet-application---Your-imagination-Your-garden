import { Component } from '@angular/core';
import { FirmeService } from '../services/firme.service';
import { Firma } from '../models/firma';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-vlasnik-firme',
  templateUrl: './vlasnik-firme.component.html',
  styleUrls: ['./vlasnik-firme.component.css']
})
export class VlasnikFirmeComponent {

  constructor(private firmeServis: FirmeService, private korisniciServis: KorisniciService) { }

  firme: Firma[] = []

  starsDisabled: boolean = true

  ngOnInit(): void {
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

  memFirmu(nazivFirme: string): void {
    localStorage.setItem('izabranaFirma', nazivFirme);
  }

  nazivFirme: string = ''
  adresaFirme: string = ''

  opcijaSort: string = ''

  firmePretrazene: Firma[] = []

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
