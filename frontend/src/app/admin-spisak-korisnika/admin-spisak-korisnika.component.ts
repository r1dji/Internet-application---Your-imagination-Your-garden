import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { FirmeService } from '../services/firme.service';
import { Firma } from '../models/firma';
import { Korisnik } from '../models/korisnik';
import { Usluga } from '../models/usluga';

@Component({
  selector: 'app-admin-spisak-korisnika',
  templateUrl: './admin-spisak-korisnika.component.html',
  styleUrls: ['./admin-spisak-korisnika.component.css']
})
export class AdminSpisakKorisnikaComponent {

  constructor(private http: HttpClient, private korisniciServis: KorisniciService, private firmeServis: FirmeService) { }

  firme: Firma[] = []
  korisnici: Korisnik[] = []

  izabraniKorisnik: Korisnik = new Korisnik()
  izabranaFirma: Firma = new Firma()

  ngOnInit(): void {
    this.korisniciServis.getAllNoAdmin().subscribe(
      kor => {
        this.korisnici = kor;
      }
    )
    this.firmeServis.getAll().subscribe(
      fir => {
        this.firme = fir;
      }
    )
  }

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
      this.slikaNovoHolder = null;
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
          this.izabraniKorisnik.profilna_slika = this.slikaNova;
          this.slikaNovoHolder = null;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.profilna_slika = this.slikaNova;
            }
          })
        }
      }
    )
  }

  promeniKorImeKor(): void {
    this.korisniciServis.promeniKorIme(this.izabraniKorisnik.korisnicko_ime, this.korImeNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.korisnicko_ime = this.korImeNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.korisnicko_ime = this.korImeNovo;
            }
          })
          this.korImeNovo = ''
        }
      }
    )
  }

  promeniLozKor(): void {
    this.korisniciServis.promeniLozinkuAdmin(this.izabraniKorisnik.korisnicko_ime, this.izabraniKorisnik.lozinka, this.lozinkaNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.messageLozinkaError = 'Lozinka promenjena!';
          console.log('yea')
        }
      }
    )
  }

  promeniImeKor(): void {
    this.korisniciServis.promeniIme(this.izabraniKorisnik.korisnicko_ime, this.imeNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.ime = this.imeNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.ime = this.imeNovo;
            }
          })
        }
      }
    )
  }

  promeniPrezimeKor(): void {
    this.korisniciServis.promeniPrezime(this.izabraniKorisnik.korisnicko_ime, this.prezimeNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.prezime = this.prezimeNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.prezime = this.prezimeNovo;
            }
          })
        }
      }
    )
  }

  promeniPolKor(): void {
    this.korisniciServis.promeniPol(this.izabraniKorisnik.korisnicko_ime, this.polNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.pol = this.polNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.pol = this.polNovo;
            }
          })
        }
      }
    )
  }

  promeniAdresuKor(): void {
    this.korisniciServis.promeniAdresu(this.izabraniKorisnik.korisnicko_ime, this.adresaKorNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.adresa = this.adresaKorNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.adresa = this.adresaKorNovo;
            }
          })
        }
      }
    )
  }

  promeniTelefonKor(): void {
    this.korisniciServis.promeniTelefon(this.izabraniKorisnik.korisnicko_ime, this.telefonKorNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.telefon = this.telefonKorNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.telefon = this.telefonKorNovo;
            }
          })
        }
      }
    )
  }

  promeniEmailKor(): void {
    this.korisniciServis.promeniEmail(this.izabraniKorisnik.korisnicko_ime, this.emailKorNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.email = this.emailKorNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.email = this.emailKorNovo;
            }
          })
          this.emailKorNovo = ''
        }
      }
    )
  }

  promeniBrKarticeKor(): void {
    this.korisniciServis.promeniBrKartice(this.izabraniKorisnik.korisnicko_ime, this.brKarticeNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabraniKorisnik.broj_kartice = this.brKarticeNovo;
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.broj_kartice = this.brKarticeNovo;
            }
          })
        }
      }
    )
  }

  aktivirajKorisnika(): void {
    let korisnik = this.izabraniKorisnik.korisnicko_ime;
    this.korisniciServis.promeniStatus(korisnik, 'aktivan').subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabranaFirma.status = 'aktivan';
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.status = 'aktivan';
            }
          })
        }
      }
    )
  }

  blokirajKorisnika(): void {
    let korisnik = this.izabraniKorisnik.korisnicko_ime;
    this.korisniciServis.promeniStatus(korisnik, 'blokiran').subscribe(
      mess => {
        if (mess == 'ok') {
          this.izabranaFirma.status = 'blokiran';
          this.korisnici.forEach((korisnik: Korisnik) => {
            if (korisnik.korisnicko_ime == this.izabraniKorisnik.korisnicko_ime) {
              korisnik.status = 'blokiran';
            }
          })
        }
      }
    )
  }

  //FIRME

  nazivNovo: string = ''
  adresaNovo: string = ''
  ocenaNovo: number | null = null
  telefonFirmaNovo: string = ''
  datumPocetkaOdmoraNovo: string = ''
  datumKrajaOdmoraNovo: string = ''
  kontaktOsobaNovo: string = ''
  uslugaNazivNovo: string = ''
  uslugaCenaNovo: string = ''

  nazivFirmeErrorMess: string = ''
  telefonErrorMess: string = ''
  datumiErrorMess: string = ''

  nazivFirmeCheck(): void {
    this.firmeServis.getFirmByName(this.nazivNovo).subscribe(
      firma => {
        if (firma != null) {
          this.nazivFirmeErrorMess = 'Naziv firme već postoji.'
        } else {
          this.nazivFirmeErrorMess = ''
        }
      }
    )
  }

  telefonFirmeCheck(): void {
    const phoneRegex = /^\+?\d+$/
    if (!(phoneRegex.test(this.telefonFirmaNovo))) {
      this.telefonErrorMess = 'Broj telefona nije ispravan.'
    } else {
      this.telefonErrorMess = ''
    }
  }

  proveriDatume(): void {
    if (this.datumPocetkaOdmoraNovo != null && this.datumKrajaOdmoraNovo != null) {
      if (this.datumPocetkaOdmoraNovo < this.datumKrajaOdmoraNovo) {
        this.datumiErrorMess = ''
      }
      else if (this.datumPocetkaOdmoraNovo > this.datumKrajaOdmoraNovo || (this.izabranaFirma.datumPocetkaOdmora != '' && this.datumPocetkaOdmoraNovo > this.izabranaFirma.datumKrajaOdmora) ||
        (this.izabranaFirma.datumKrajaOdmora != '' && this.datumKrajaOdmoraNovo < this.izabranaFirma.datumPocetkaOdmora)
      ) {
        this.datumiErrorMess = 'Datum početka odmora mora biti pre kraja odmora.'
      } else {
        this.datumiErrorMess = ''
      }
    } else {
      this.datumiErrorMess = ''
    }
  }

  promeniNazivFirme(): void {
    this.firmeServis.promeniNaziv(this.izabranaFirma.naziv, this.nazivNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.firme.forEach((firma: Firma) => {
            if (firma.naziv == this.izabranaFirma.naziv) {
              firma.naziv = this.nazivNovo;
            }
          })
          this.izabranaFirma.naziv = this.nazivNovo;
        }
      }
    )
  }

  promeniAdresuFirme(): void {
    this.firmeServis.promeniAdresu(this.izabranaFirma.naziv, this.adresaNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.firme.forEach((firma: Firma) => {
            if (firma.naziv == this.izabranaFirma.naziv) {
              firma.adresa = this.adresaNovo;
            }
          })
          this.izabranaFirma.adresa = this.adresaNovo;
        }
      }
    )
  }

  promeniOcenuFirme(): void {
    this.firmeServis.promeniOcenu(this.izabranaFirma.naziv, this.ocenaNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.firme.forEach((firma: Firma) => {
            if (firma.naziv == this.izabranaFirma.naziv) {
              if (this.ocenaNovo != null) {
                firma.ocena = this.ocenaNovo;
              }
            }
          })
          if (this.ocenaNovo != null) {
            this.izabranaFirma.ocena = this.ocenaNovo;
          }
        }
      }
    )
  }

  promeniTelefonFirme(): void {
    this.firmeServis.promeniTelefon(this.izabranaFirma.naziv, this.telefonFirmaNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.firme.forEach((firma: Firma) => {
            if (firma.naziv == this.izabranaFirma.naziv) {
              firma.telefon = this.telefonFirmaNovo;
            }
          })
          this.izabranaFirma.telefon = this.telefonFirmaNovo;
        }
      }
    )
  }

  promeniDatumPocetakOdmora(): void {
    this.firmeServis.promeniDatumPocOdmora(this.izabranaFirma.naziv, this.datumPocetkaOdmoraNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.firme.forEach((firma: Firma) => {
            if (firma.naziv == this.izabranaFirma.naziv) {
              firma.datumPocetkaOdmora = this.datumPocetkaOdmoraNovo;
            }
          })
          this.izabranaFirma.datumPocetkaOdmora = this.datumPocetkaOdmoraNovo;
        }
      }
    )
  }

  promeniDatumKrajaOdmora(): void {
    this.firmeServis.promeniDatumKrajaOdmora(this.izabranaFirma.naziv, this.datumKrajaOdmoraNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.firme.forEach((firma: Firma) => {
            if (firma.naziv == this.izabranaFirma.naziv) {
              firma.datumKrajaOdmora = this.datumKrajaOdmoraNovo;
            }
          })
          this.izabranaFirma.datumKrajaOdmora = this.datumKrajaOdmoraNovo;
        }
      }
    )
  }

  promeniKontaktOsobu(): void {
    this.firmeServis.promeniKontaktOsobu(this.izabranaFirma.naziv, this.kontaktOsobaNovo).subscribe(
      mess => {
        if (mess == 'ok') {
          this.firme.forEach((firma: Firma) => {
            if (firma.naziv == this.izabranaFirma.naziv) {
              firma.kontaktOsoba = this.kontaktOsobaNovo;
            }
          })
          this.izabranaFirma.kontaktOsoba = this.kontaktOsobaNovo;
        }
      }
    )
  }

  nazivUsluge: string = ''
  cenaUsluge: number = -1;

  dodajUslugu(): void {
    this.firmeServis.dodajUslugu(this.izabranaFirma.naziv, this.nazivUsluge, this.cenaUsluge).subscribe(
      mess => {
        if (mess == 'ok') {
          let uslugaTmp = new Usluga()
          uslugaTmp.naziv = this.nazivUsluge;
          uslugaTmp.cena = this.cenaUsluge;
          this.izabranaFirma.usluge.push(uslugaTmp);
        }
      }
    )
  }

  azurirajUslugu(usluga: Usluga): void {
    if (usluga.nazivAzur != '' && usluga.cenaAzur != null) {
      this.firmeServis.promeniNazivUsluge(this.izabranaFirma.naziv, usluga.nazivAzur, usluga.naziv).subscribe(
        mess => {
          if (mess == 'ok') {
            if (usluga.cenaAzur != null) {
              this.firmeServis.promeniCenuUsluge(this.izabranaFirma.naziv, usluga.cenaAzur, usluga.naziv).subscribe(
                mess => {
                  if (mess == 'ok') {
                    this.izabranaFirma.usluge.forEach((usluga: Usluga) => {
                      if (usluga.naziv ==usluga.naziv) {
                        if (usluga.cenaAzur != null) {
                          usluga.cena = usluga.cenaAzur;
                        }
                        usluga.naziv = usluga.nazivAzur;
                      }
                    })
                  }
                }
              )
            }
          }
        }
      )
    } else if (usluga.nazivAzur != '' && usluga.cenaAzur == null) {
      this.firmeServis.promeniNazivUsluge(this.izabranaFirma.naziv, usluga.nazivAzur,usluga.naziv).subscribe(
        mess => {
          if (mess == 'ok') {
            this.izabranaFirma.usluge.forEach((usluga: Usluga) => {
              if (usluga.naziv ==usluga.naziv) {
                usluga.naziv = usluga.nazivAzur;
              }
            })
          }
        }
      )
    } else if (usluga.nazivAzur == '' && usluga.cenaAzur != null) {
      this.firmeServis.promeniCenuUsluge(this.izabranaFirma.naziv, usluga.cenaAzur,usluga.naziv).subscribe(
        mess => {
          if (mess == 'ok') {
            this.izabranaFirma.usluge.forEach((usluga: Usluga) => {
              if (usluga.naziv ==usluga.naziv) {
                if (usluga.cenaAzur != null) {
                  usluga.cena = usluga.cenaAzur;
                }
              }
            })
          }
        }
      )
    }
  }

  obrisiKomentar(korisnik: string, sadrzaj: string): void {
    this.firmeServis.obrisiKomentar(this.izabranaFirma.naziv, korisnik, sadrzaj).subscribe(
      mess => {
        if (mess == 'ok') {
          let num = this.izabranaFirma.komentari.length;
          let cnt = 0;
          let kortmp = ''
          let sadtmp = ''
          while (cnt < num && (kortmp != korisnik && sadtmp != sadrzaj)) {
            kortmp = this.izabranaFirma.komentari[cnt].korisnik;
            sadtmp = this.izabranaFirma.komentari[cnt].sadrzaj;
            cnt++;
          }
          if (cnt == this.izabranaFirma.komentari.length) {
            this.izabranaFirma.komentari.pop();
          } else {
            let cnt2 = cnt;
            cnt--;
            while (cnt2 < num) {
              this.izabranaFirma.komentari[cnt] = this.izabranaFirma.komentari[cnt2];
              cnt2++;
              cnt++;
            }
            this.izabranaFirma.komentari.pop();
          }
        }
      }
    )
  }


}
