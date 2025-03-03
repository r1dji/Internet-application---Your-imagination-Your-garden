import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

  constructor(private korisniciServis: KorisniciService, private router: Router) { }

  korisnicko_ime: string = ''
  lozinka: string = ''
  message: string = ''

  login(): void {
    if (this.korisnicko_ime != '' && this.lozinka != '') {
      this.korisniciServis.login(this.korisnicko_ime, this.lozinka, 'adminlogin').subscribe(
        korisnik => {
          if (korisnik != null && korisnik.tip == 'admin') {
            localStorage.setItem('logged', korisnik.korisnicko_ime);
            this.router.navigate(['admin']);
          } else {
            this.message = 'Ne postoji korisnik za unete podatke. Proverite da li ste dobro uneli korisničko ime i lozinku.'
          }
        }
      )
    } else {
      this.message = 'Unesite korisnicko ime i lozinku.';
    }

  }

}
