import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-promenalozinke',
  templateUrl: './promenalozinke.component.html',
  styleUrls: ['./promenalozinke.component.css']
})
export class PromenalozinkeComponent {

  constructor(private http: HttpClient, private korisniciServis: KorisniciService) { }

  korIme: string = ''
  staraLozinka: string = ''
  novaLozinka: string = ''
  ponovljenaLozinka: string = ''
  messageError: string = ''
  messageSucces: string = ''

  proveriLozinke(): void {
    if (this.novaLozinka != this.ponovljenaLozinka) {
      this.messageError = 'Nova i ponovljena lozinke nisu iste.'
    } else {
      this.messageError = ''
    }
  }

  promeniLozinku(): void {
    if (this.messageError == '') {
      this.korisniciServis.promeniLozinku(this.korIme, this.staraLozinka, this.ponovljenaLozinka).subscribe(
        mess => {
          if (mess == 'ok') {
            this.messageSucces = 'Lozinka je uspešno promenjena!'
            this.messageError = ''
            this.ocistiSve()
          } else {
            this.messageError = 'Došlo je do greške. Proverite korisničko ime i lozinku.'
            this.messageSucces = ''
          }
        }
      )
    }
  }

  checkAgain(): void {
    this.messageError = ''
  }

  private ocistiSve(): void {
    this.korIme = ''
    this.staraLozinka = ''
    this.novaLozinka = ''
    this.ponovljenaLozinka = ''
  }

  checkPassword(): void {
    const regPasswordCheck = new RegExp(/^(?=[A-Za-z])(?=(.*[A-Z]){1,})(?=(.*[a-z].*[a-z].*[a-z]))(?=(.*\d){1,})(?=(.*\W){1,})[A-Za-z\d\W]{6,10}$/);
    if (!(regPasswordCheck.test(this.novaLozinka))) {
      this.messageError = 'Lozinka ne zadovoljava sve kriterijume.'
    } else {
      this.proveriLozinke();
    }
  }

}
