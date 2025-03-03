import { Component } from '@angular/core';
import { FirmeService } from '../services/firme.service';
import { Usluga } from '../models/usluga';
import { Korisnik } from '../models/korisnik';
import { Firma } from '../models/firma';
import { KorisniciService } from '../services/korisnici.service';
import { Get64BaseStringFromFolderService } from '../services/get64-base-string-from-folder.service';

@Component({
  selector: 'app-admin-dodavanje-firme',
  templateUrl: './admin-dodavanje-firme.component.html',
  styleUrls: ['./admin-dodavanje-firme.component.css']
})
export class AdminDodavanjeFirmeComponent {

  constructor(private firmeServis: FirmeService, private korisniciServis: KorisniciService,
    private get64BaseStringServis: Get64BaseStringFromFolderService
  ) { }

  nazivFirme: string = ''
  adresaFirme: string = ''
  kontaktOsoba: string = ''
  telefonFirma: string = ''
  usluge: Usluga[] = []

  nazivUsluge: string = ''
  cenaUsluge: number = -1

  datumPocetkaOdmora: Date | null = null;
  datumKrajaOdmora: Date | null = null;

  datumiErrorMess: string = ''
  telefonFirmeErrorMess: string = ''
  nazivFirmeErrorMess: string = ''

  ngOnInit(): void {

  }

  onAddressChange(newAddress: string): void {
    this.adresaFirme = newAddress;
  }

  dodajUslugu(): void {
    let tempUsl: Usluga = new Usluga();
    tempUsl.naziv = this.nazivUsluge;
    tempUsl.cena = this.cenaUsluge;
    this.usluge.push(tempUsl);
    this.nazivUsluge = ''
    this.cenaUsluge = -1;
  }

  proveriDatume(): void {
    if (this.datumPocetkaOdmora != null && this.datumKrajaOdmora != null) {
      if (this.datumPocetkaOdmora > this.datumKrajaOdmora) {
        this.datumiErrorMess = 'Datum početka odmora mora biti pre kraja odmora.'
      } else {
        this.datumiErrorMess = ''
      }
    } else {
      this.datumiErrorMess = ''
    }
  }

  proveriNazivFirme(): void {
    this.firmeServis.getFirmByName(this.nazivFirme).subscribe(
      firma => {
        if (firma != null) {
          this.nazivFirmeErrorMess = 'Naziv firme već postoji u bazi.'
        } else {
          this.nazivFirmeErrorMess = ''
        }
      }
    )
  }

  dekorateri: Korisnik[] = []

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

  dodaj(): void {
    if (this.messageKorImeError == '' && this.messageLozError == '' && this.messageEmailError == '' &&
      this.messageCardNumberError == '' && this.messagePictureError == '' && this.messagePhoneError == '') {
      if (this.korisnicko_ime != '' && this.lozinka != '' && this.ime != '' && this.prezime != '' && this.adresa != '' &&
        this.telefon != '' && this.email != '' && this.broj_kartice != ''
      ) {
          let dekoraterTmp = new Korisnik()
          dekoraterTmp.korisnicko_ime = this.korisnicko_ime;
          dekoraterTmp.lozinka = this.lozinka;
          dekoraterTmp.ime = this.ime;
          dekoraterTmp.prezime = this.prezime;
          dekoraterTmp.pol = this.pol;
          dekoraterTmp.adresa = this.adresa;
          dekoraterTmp.telefon = this.telefon;
          dekoraterTmp.email = this.email;
          dekoraterTmp.profilna_slika = this.profilna_slika;
          dekoraterTmp.broj_kartice = this.broj_kartice;
          dekoraterTmp.tip = 'dekorater';
          dekoraterTmp.status = 'aktivan';
          dekoraterTmp.firma = this.nazivFirme;
          this.dekorateri.push(dekoraterTmp);
          this.messageRegisterError = ''
          this.messageRegisterSucces = 'Dekorater dodat!'
          this.ocistiSve();
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
  }

  checkTelFirme(): void {
    const phoneRegex = /^\+?\d+$/
    if (!(phoneRegex.test(this.telefonFirma))) {
      this.telefonFirmeErrorMess = 'Telefon nije validan.'
    } else {
      this.telefonFirmeErrorMess = ''
    }
  }

  messDodFirme: string = ''

  dodajFirmu(): void {
    this.firmeServis.dodajFirmu(this.nazivFirme, this.adresaFirme, this.telefonFirma, this.kontaktOsoba, this.datumPocetkaOdmora,
      this.datumKrajaOdmora, this.usluge).subscribe(
        mess => {
          if (mess == 'ok') {
            for (let i = 0; i < this.dekorateri.length; i++) {
              this.korisniciServis.registerKorisnik(this.dekorateri[i].korisnicko_ime,
                this.dekorateri[i].lozinka,
                this.dekorateri[i].ime,
                this.dekorateri[i].prezime,
                this.dekorateri[i].pol,
                this.dekorateri[i].adresa,
                this.dekorateri[i].telefon,
                this.dekorateri[i].email,
                this.dekorateri[i].profilna_slika,
                this.dekorateri[i].broj_kartice,
                'dekorater',
                'aktivan',
                this.nazivFirme
              ).subscribe(
                mess => {
                  if (mess == 'ok' && i == this.dekorateri.length - 1) {
                    this.messDodFirme = 'Firma dodata uspešno!'
                    this.ocistiSveFirma();
                  } else {
                    this.messDodFirme = ''
                  }
                }
              )
            }
          } else {
            this.messDodFirme = ''
          }
        }
    )
  }

  ocistiSveFirma(): void {
    this.nazivFirme = ''
    this.kontaktOsoba = ''
    this.telefonFirma = ''
    this.usluge = []
    this.dekorateri = []
    this.datumPocetkaOdmora = null
    this.datumKrajaOdmora = null
    this.messageRegisterSucces = ''
  }

}
