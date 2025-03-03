import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { Get64BaseStringFromFolderService } from '../services/get64-base-string-from-folder.service';
import { Firma } from '../models/firma';
import { FirmeService } from '../services/firme.service';

@Component({
  selector: 'app-admin-dodavanje-dekoratera',
  templateUrl: './admin-dodavanje-dekoratera.component.html',
  styleUrls: ['./admin-dodavanje-dekoratera.component.css']
})
export class AdminDodavanjeDekorateraComponent {

  constructor(private korisniciServis: KorisniciService, private get64BaseStringServis: Get64BaseStringFromFolderService,
    private firmeServis: FirmeService
  ) { }

  korisnicko_ime: string = ''
  lozinka: string = ''
  ime: string = ''
  prezime: string = ''
  pol: string = ''
  adresa: string = ''
  telefon: string = ''
  email: string = ''
  profilna_slika: string = ''
  profilna_slika_file: File | null = null
  broj_kartice: string = ''

  messageKorImeError: string = ''
  messageLozError: string = ''
  messageEmailError: string = ''
  messagePictureError: string = ''
  messageCardNumberError: string = ''
  messageRegisterError: string = ''
  messagePhoneError: string = ''

  messageRegisterSucces: string = ''

  register(): void {
    if (this.messageKorImeError == '' && this.messageLozError == '' && this.messageEmailError == '' &&
      this.messageCardNumberError == '' && this.messagePictureError == '' && this.messagePhoneError == '') {
      if (this.korisnicko_ime != '' && this.lozinka != '' && this.ime != '' && this.prezime != '' && this.adresa != '' &&
        this.telefon != '' && this.email != '' && this.broj_kartice != ''
      ) {
          this.korisniciServis.registerKorisnik(this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.pol, this.adresa,
            this.telefon, this.email, this.profilna_slika, this.broj_kartice, 'dekorater', 'aktivan', this.odabranaFirmaZaDekoratera
          ).subscribe(
            mess => {
              if (mess == 'ok') {
                this.messageRegisterError = ''
                this.messageRegisterSucces = 'Dekorater dodat!'
                this.ocistiSve();
              } else {
                this.messageRegisterError = 'Došlo je do greške. Registracije nije uspela.'
                this.messageRegisterSucces = ''
              }
            }
          )
      } else {
        this.messageRegisterError = 'Niste popunili sva potrebna polja.'
      }
    } else {
      this.messageRegisterError = 'Neko polje ne zadovoljava sve potrebne kriterijume.'
    }
  }

  checkUsername(): void {
    this.messageRegisterSucces = ''
    this.korisniciServis.getUserByUsername(this.korisnicko_ime).subscribe(
      korisnik => {
        if (korisnik != null) {
          this.messageKorImeError = 'Korisničko ime je zauzeto.';
        } else {
          this.messageKorImeError = '';
        }
      }
    )
  }

  checkPhone(): void {
    this.messageRegisterSucces = ''
    const phoneRegex = /^\+?\d+$/
    if (!(phoneRegex.test(this.telefon))) {
      this.messagePhoneError = 'Broj telefona nije ispravan.'
    } else {
      this.messagePhoneError = ''
    }
  }

  checkPassword(): void {
    this.messageRegisterSucces = ''
    const regPasswordCheck = new RegExp(/^(?=[A-Za-z])(?=(.*[A-Z]){1,})(?=(.*[a-z].*[a-z].*[a-z]))(?=(.*\d){1,})(?=(.*\W){1,})[A-Za-z\d\W]{6,10}$/);
    if (!(regPasswordCheck.test(this.lozinka))) {
      this.messageLozError = 'Lozinka ne zadovoljava sve kriterijume.'
    } else {
      this.messageLozError = ''
    }
  }

  checkEmail(): void {
    this.messageRegisterSucces = ''
    const regEmailCheck = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (regEmailCheck.test(this.email)) {
      this.korisniciServis.getUserByEmail(this.email).subscribe(
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

  checkCardNumber(): void {
    this.messageRegisterSucces = ''
    let tipKarticeTmp = ''
    this.tipKartice = ''
    this.dinersCardStart.forEach((elem) => {
      if (this.broj_kartice.startsWith(elem)) {
        tipKarticeTmp = 'diners'
      }
    })
    if (tipKarticeTmp == '') {
      this.masterCardStart.forEach((elem) => {
        if (this.broj_kartice.startsWith(elem)) {
          tipKarticeTmp = 'mastercard'
        }
      })
    }
    if (tipKarticeTmp == '') {
      this.visaCardStart.forEach((elem) => {
        if (this.broj_kartice.startsWith(elem)) {
          tipKarticeTmp = 'visa'
        }
      })
    }
    let flagNeispBroj = false;
    if (tipKarticeTmp != '') {
      if (tipKarticeTmp == 'mastercard' || tipKarticeTmp == 'visa') {
        if (this.broj_kartice.length == 16) {
          for (let i = 0; i < this.broj_kartice.length; i++) {
            if (!(/^\d$/.test(this.broj_kartice[i]))) {
              this.messageCardNumberError = 'Broj kartice nije ispravan.';
              tipKarticeTmp = ''
              flagNeispBroj = true;
              break;
            }
          }
          if (!flagNeispBroj) {
            this.tipKartice = tipKarticeTmp;
            this.messageCardNumberError = '';
          }
        } else {
          this.messageCardNumberError = 'Broj kartice nije ispravan.';
          tipKarticeTmp = ''
        }
      } else if (tipKarticeTmp == 'diners') {
        if (this.broj_kartice.length == 15) {
          for (let i = 0; i < this.broj_kartice.length; i++) {
            if (!(/^\d$/.test(this.broj_kartice[i]))) {
              this.messageCardNumberError = 'Broj kartice nije ispravan.';
              tipKarticeTmp = ''
              flagNeispBroj = true;
              break;
            }
          }
          if (!flagNeispBroj) {
            this.tipKartice = tipKarticeTmp;
            this.messageCardNumberError = '';
          }
        } else {
          this.messageCardNumberError = 'Broj kartice nije ispravan.';
          tipKarticeTmp = ''
        }
      }
    } else {
      this.messageCardNumberError = 'Broj kartice nije ispravan.';
      tipKarticeTmp = ''
    }
  }

  pictureUploaded(event: Event): void {
    this.messageRegisterSucces = ''
    const target = event.target as HTMLInputElement;
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
              this.messagePictureError = 'Slika nije odgovarajuće veličina. Molimo unesite drugu sliku.'
              this.profilna_slika = '';
            } else {
              this.profilna_slika = imgStr;
              this.messagePictureError = '';
            }
          }
          image.src = imgStr;
        }
        fileReader.readAsDataURL(file);
      } else {
        this.messagePictureError = 'Slika nije odgovarajućeg formata. Molimo unesite drugu sliku.'
        this.profilna_slika = '';
      }
    } else {
      this.profilna_slika = '';
    }
  }

  private ocistiSve(): void {
    this.korisnicko_ime = ''
    this.lozinka = ''
    this.ime = ''
    this.prezime = ''
    this.adresa = ''
    this.telefon = ''
    this.pol = ''
    this.email = ''
    this.profilna_slika = ''
    this.broj_kartice = ''
    this.tipKartice = ''
    this.odabranaFirmaZaDekoratera = ''
  }

  firme: Firma[] = []

  odabranaFirmaZaDekoratera: string = ''

  ngOnInit(): void {
    this.firmeServis.getAll().subscribe(
      f => {
        this.firme = f;
      }
    )
  }

}
