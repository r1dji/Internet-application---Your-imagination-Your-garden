import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-zahtevi-obrada',
  templateUrl: './admin-zahtevi-obrada.component.html',
  styleUrls: ['./admin-zahtevi-obrada.component.css']
})
export class AdminZahteviObradaComponent {

  constructor(private korisniciServis: KorisniciService) { }

  korisniciNeobradjeni: Korisnik[] = []

  ngOnInit(): void {
    this.korisniciServis.getUObradi().subscribe(
      zah => {
        this.korisniciNeobradjeni = zah;
      }
    )
  }

  promeniStatus(korisnik: string, statusN: string): void {
    this.korisniciServis.promeniStatus(korisnik, statusN).subscribe(
      mess => {
        if (mess == 'ok') {
          this.ngOnInit();
        }
      }
    )
  }

}
