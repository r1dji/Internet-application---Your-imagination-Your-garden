import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-dekorater-profil',
  templateUrl: './dekorater-profil.component.html',
  styleUrls: ['./dekorater-profil.component.css']
})
export class DekoraterProfilComponent {

  constructor(private korisniciServis: KorisniciService) { }

  ngOnInit(): void {
    let korImeTmp = localStorage.getItem('logged')
    if (korImeTmp != null) {
      this.korisniciServis.getUserByUsername(korImeTmp).subscribe(
        kor => {
          if (kor != null) {
            this.izabraniKorisnik = kor;
          }
        }
      )
    }
  }

  izabraniKorisnik: Korisnik = new Korisnik()

  korImeNovo: string = ''
  lozinkaNovo: string = ''
  imeNovo: string = ''
  prezimeNovo: string = ''
  polNovo: string = ''
  adresaKorNovo: string = ''
  telefonKorNovo: string = ''
  emailKorNovo: string = ''
  brKarticeNovo: string = ''
  slikaNovoHolder: File | null = null;
  slikaNova: string = ''

  messageSlikaError: string = ''
  messageKorImeError: string = ''
  messageLozinkaError: string = ''
  messageTelefonError: string = ''
  messageEmailError: string = ''
  messageBrKarticeError: string = ''

  slikaCheck(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      if (file.type.startsWith('image/')) {
        const fileReader = new FileReader();
        fileReader.onload = (ev: ProgressEvent<FileReader>) => {
          const imgStr = ev.target?.result as string;
          const image = new Image();
          image.onload = (e: Event) => {
            const imgH = image.height;
            const imgW = image.width;
            if (imgH < 100 || imgH > 300 || imgW < 100 || imgW > 300) {
              this.messageSlikaError = 'Slika nije odgovarajuće veličine. Molimo unesite drugu sliku.'
              this.slikaNova = '';
            } else {
              this.slikaNova = imgStr;
              this.messageSlikaError = '';
            }
          }
          image.src = imgStr;
        }
        fileReader.readAsDataURL(file);
      } else {
        this.messageSlikaError = 'Slika nije odgovarajućeg formata. Molimo unesite drugu sliku.'
        this.slikaNova = '';
      }
    } else {
      this.slikaNova = '';
    }
  }

  korImeCheck(): void {
    this.korisniciServis.getUserByUsername(this.korImeNovo).subscribe(
      korisnik => {
        if (korisnik != null) {
          this.messageKorImeError = 'Korisničko ime je zauzeto.';
        } else {
          this.messageKorImeError = '';
        }
      }
    )
  }

  lozinkaCheck(): void {
    const regPasswordCheck = new RegExp(/^(?=[A-Za-z])(?=(.*[A-Z]){1,})(?=(.*[a-z].*[a-z].*[a-z]))(?=(.*\d){1,})(?=(.*\W){1,})[A-Za-z\d\W]{6,10}$/);
    if (!(regPasswordCheck.test(this.lozinkaNovo))) {
      this.messageLozinkaError = 'Lozinka ne zadovoljava sve kriterijume.'
    } else {
      this.messageLozinkaError = ''
    }
  }


  telefonCheck(): void {
    const phoneRegex = /^\+?\d+$/
    if (!(phoneRegex.test(this.telefonKorNovo))) {
      this.messageTelefonError = 'Broj telefona nije ispravan.'
    } else {
      this.messageTelefonError = ''
    }
  }

  emailCheck(): void {
    const regEmailCheck = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (regEmailCheck.test(this.emailKorNovo)) {
      this.korisniciServis.getUserByEmail(this.emailKorNovo).subscribe(
        kor => {
          if (kor) {
            this.messageEmailError = 'Email je zauzet.'
          } else {
            this.messageEmailError = ''
          }
        }
      )
    } else {
      this.messageEmailError = 'Email nije validan.'
    }
  }

  private readonly dinersCardStart: string[] = ['300', '301', '302', '303', '36', '38'];
  private readonly masterCardStart: string[] = ['51', '52', '53', '54', '55'];
  private readonly visaCardStart: string[] = ['4539', '4556', '4916', '4532', '4929', '4485', '4716'];
  tipKartice: string = ''

  brKarticeCheck(): void {
    let tipKarticeTmp = ''
    this.tipKartice = ''
    this.dinersCardStart.forEach((elem) => {
      if (this.brKarticeNovo.startsWith(elem)) {
        tipKarticeTmp = 'diners'
      }
    })
    if (tipKarticeTmp == '') {
      this.masterCardStart.forEach((elem) => {
        if (this.brKarticeNovo.startsWith(elem)) {
          tipKarticeTmp = 'mastercard'
        }
      })
    }
    if (tipKarticeTmp == '') {
      this.visaCardStart.forEach((elem) => {
        if (this.brKarticeNovo.startsWith(elem)) {
          tipKarticeTmp = 'visa'
        }
      })
    }
    let flagNeispBroj = false;
    if (tipKarticeTmp != '') {
      if (tipKarticeTmp == 'mastercard' || tipKarticeTmp == 'visa') {
        if (this.brKarticeNovo.length == 16) {
          for (let i = 0; i < this.brKarticeNovo.length; i++) {
            if (!(/^\d$/.test(this.brKarticeNovo[i]))) {
              this.messageBrKarticeError = 'Broj kartice nije ispravan.';
              tipKarticeTmp = ''
              flagNeispBroj = true;
              break;
            }
          }
          if (!flagNeispBroj) {
            this.tipKartice = tipKarticeTmp;
            this.messageBrKarticeError = '';
          }
        } else {
          this.messageBrKarticeError = 'Broj kartice nije ispravan.';
          tipKarticeTmp = ''
        }
      } else if (tipKarticeTmp == 'diners') {
        if (this.brKarticeNovo.length == 15) {
          for (let i = 0; i < this.brKarticeNovo.length; i++) {
            if (!(/^\d$/.test(this.brKarticeNovo[i]))) {
              this.messageBrKarticeError = 'Broj kartice nije ispravan.';
              tipKarticeTmp = ''
              flagNeispBroj = true;
              break;
            }
          }
          if (!flagNeispBroj) {
            this.tipKartice = tipKarticeTmp;
            this.messageBrKarticeError = '';
          }
        } else {
          this.messageBrKarticeError = 'Broj kartice nije ispravan.';
          tipKarticeTmp = ''
        }
      }
    } else {
      this.messageBrKarticeError = 'Broj kartice nije ispravan.';
      tipKarticeTmp = ''
    }
  }

  promeniSlikuKor(): void {
    this.korisniciServis.promeniSliku(this.izabraniKorisnik.korisnicko_ime, this.slikaNova).subscribe(
      mess => {
        if (mess == 'ok') {
          this.slikaNovoHolder = null;
          this.ngOnInit();
        }
      }
    )
  }

  promeniImeKor(): void {
    this.korisniciServis.promeniIme(this.izabraniKorisnik.korisnicko_ime, this.imeNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.imeNovo = ''
          this.ngOnInit();
        }
      }
    )
  }

  promeniPrezimeKor(): void {
    this.korisniciServis.promeniPrezime(this.izabraniKorisnik.korisnicko_ime, this.prezimeNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.prezimeNovo = ''
          this.ngOnInit();
        }
      }
    )
  }

  promeniAdresuKor(): void {
    this.korisniciServis.promeniAdresu(this.izabraniKorisnik.korisnicko_ime, this.adresaKorNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.adresaKorNovo = ''
          this.ngOnInit();
        }
      }
    )
  }

  promeniTelefonKor(): void {
    this.korisniciServis.promeniTelefon(this.izabraniKorisnik.korisnicko_ime, this.telefonKorNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.telefonKorNovo = ''
          this.ngOnInit();
        }
      }
    )
  }

  promeniEmailKor(): void {
    this.korisniciServis.promeniEmail(this.izabraniKorisnik.korisnicko_ime, this.emailKorNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.emailKorNovo = ''
          this.ngOnInit();
        }
      }
    )
  }

  promeniBrKarticeKor(): void {
    this.korisniciServis.promeniBrKartice(this.izabraniKorisnik.korisnicko_ime, this.brKarticeNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.brKarticeNovo = ''
          this.ngOnInit();
        }
      }
    )
  }

}
