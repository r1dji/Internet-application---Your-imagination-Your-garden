import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { PosloviService } from '../services/poslovi.service';
import { Korisnik } from '../models/korisnik';
import { Posao } from '../models/posao';

@Component({
  selector: 'app-vlasnik-zakazivanja',
  templateUrl: './vlasnik-zakazivanja.component.html',
  styleUrls: ['./vlasnik-zakazivanja.component.css']
})
export class VlasnikZakazivanjaComponent {

  constructor(private korisniciServis: KorisniciService, private posaoServis: PosloviService) { }

  trenutniKorisnik: Korisnik = new Korisnik()
  posloviAktuelni: Posao[] = []

  ngOnInit(): void {
    let korImeTmp = localStorage.getItem('logged')
    if (korImeTmp != null) {
      this.korisniciServis.getUserByUsername(korImeTmp).subscribe(
        kor => {
          this.trenutniKorisnik = kor;
          console.log(this.trenutniKorisnik)
          this.posaoServis.getAllZakazaneIUObrZaVlasnika(this.trenutniKorisnik.korisnicko_ime).subscribe(
            pos => {
              this.posloviAktuelni = pos;
            }
          )
        }
      )
    }
  }

}
