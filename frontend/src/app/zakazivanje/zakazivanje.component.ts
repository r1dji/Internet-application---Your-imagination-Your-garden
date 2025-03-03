import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { FirmeService } from '../services/firme.service';
import { Korisnik } from '../models/korisnik';
import { Firma } from '../models/firma';
import { Usluga } from '../models/usluga';
import { PosloviService } from '../services/poslovi.service';

@Component({
  selector: 'app-zakazivanje',
  templateUrl: './zakazivanje.component.html',
  styleUrls: ['./zakazivanje.component.css']
})
export class ZakazivanjeComponent {

  constructor(private korisniciServis: KorisniciService, private firmeServis: FirmeService, private posloviServis: PosloviService) { }

  trenutniKorisnik: Korisnik = new Korisnik()
  izabranaFirma: Firma = new Firma()

  step: number = 1;

  kvadratura: number = 0;
  tipBaste: string = ''
  datum: Date | null = null

  ngOnInit(): void {
    let korImeTmp = localStorage.getItem('logged');
    let firmaTmp = localStorage.getItem('izabranaFirma');
    if (korImeTmp != null && firmaTmp != null) {
      this.korisniciServis.getUserByUsername(korImeTmp).subscribe(
        kor => {
          this.trenutniKorisnik = kor;
          if (firmaTmp != null) {
            this.firmeServis.getFirmByName(firmaTmp).subscribe(
              fir => {
                this.izabranaFirma = fir;
              }
            )
          }
        }
      )
    }
  }

  kvadraturaBazena: number | null = null;
  kvadraturaZelenilaPB: number | null = null;
  kvadraturaLezIStol: number | null = null;

  kvadraturaFontana: number | null = null;
  kvadraturaZeleniloBR: number | null = null;
  brojStolovaIStoli: number | null = null;

  dodatanKomentarPB: string = ''
  dodatanKomentarBR: string = ''

  fileHolderPB: File | null = null;
  fileHolderBR: File | null = null;

  messErrorKvadratura: string = ''
  messErrorDatum: string = ''

  checkKvadratura(): void {
    if(this.kvadratura < 1) {
      this.messErrorKvadratura = 'Kvadratura mora biti pozitivan broj.'
    } else {
      this.messErrorKvadratura = ''
    }
  }

  checkDatum(): void {
    if (this.datum != null) {
      if (new Date(this.datum) < new Date()) {
        this.messErrorDatum = 'Datum nije validan.'
      } else {
        this.messErrorDatum = ''
      }
    }
  }

  changeLevelTo2(): void {
    this.step = 2;
  }

  changeLevelTo1(): void {
    this.step = 1;
  }

  brojVodenihPovrsina: number = 0;
  brojZelenihPovrsina: number = 0;
  brojStolicaILezaljka: number = 0;

  proveraKvadrature(): void {
    if (this.tipBaste == 'privatna basta' && this.kvadraturaBazena != null && this.kvadraturaZelenilaPB != null && this.kvadraturaLezIStol != null) {
      if (this.kvadraturaBazena > 0 && this.brojVodenihPovrsina < 1) {
        this.errorMess = 'Kvadrature se ne poklapaju.'
      }
      else if (this.kvadraturaZelenilaPB > 0 && this.brojZelenihPovrsina < 1) {
        this.errorMess = 'Kvadrature se ne poklapaju.'
      }
      else if (this.kvadraturaLezIStol > 0 && this.brojStolicaILezaljka < 1) {
        this.errorMess = 'Kvadrature se ne poklapaju.'
      } else {
        this.errorMess = ''
      }
    } else if (this.tipBaste == 'basta restorana' && this.kvadraturaFontana != null && this.kvadraturaZeleniloBR != null && this.brojStolovaIStoli != null) {
      if (this.kvadraturaFontana > 0 && this.brojVodenihPovrsina < 1) {
        this.errorMess = 'Kvadrature se ne poklapaju.'
      }
      else if (this.kvadraturaZeleniloBR > 0 && this.brojZelenihPovrsina < 1) {
        this.errorMess = 'Kvadrature se ne poklapaju.'
      }
      else if (this.brojStolovaIStoli > 0 && this.brojStolicaILezaljka < 1) {
        this.errorMess = 'Kvadrature se ne poklapaju.'
      } else {
        this.errorMess = ''
      }
    }
  }

  ucitanFileBasta(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file?.type != 'application/json') {
      this.errorMess = 'Fajl mora imati ekstenziju .json'
    }
    if (file != null) {
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => {
        const jsonSadrzaj = JSON.parse(e.target.result);

        this.iscrtaj(jsonSadrzaj);
        this.proveraKvadrature();
      }
      fileReader.readAsText(file);
    }
  }

  ucitajSaFajla(): void {
    const file = this.fileHolderPB;
    if (file != null) {
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => {
        const jsonSadrzaj = JSON.parse(e.target.result);

        this.iscrtaj(jsonSadrzaj);
        this.proveraKvadrature();
      }
      fileReader.readAsText(file);
    }
  }


  iscrtaj(sadrzaj: any): void {
    const canvas = document.getElementById('bastaPrikaz') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sadrzaj.forEach((predmet: any) => {
      const { tip, boja, x, y, sirina, duzina, precnik } = predmet;
      ctx.fillStyle = boja;

      if ((tip == 'pravougaonik' && boja == 'blue') || (tip == 'krug' && boja == 'blue')) {
        this.brojVodenihPovrsina++;
      }
      if (boja == 'green') {
        this.brojZelenihPovrsina++;
      }
      if (boja == 'silver' || boja == 'brown') {
        this.brojStolicaILezaljka++;
      }

      if (tip == 'pravougaonik') {
        ctx.fillRect(x, y, sirina, duzina);
      } else if (tip == 'krug') {
        ctx.beginPath();
        ctx.arc(x, y, precnik, 0, Math.PI * 2, false)
        ctx.fill();
      }
    })
    console.log(this.brojVodenihPovrsina)
    console.log(this.brojZelenihPovrsina)
    console.log(this.brojStolicaILezaljka)
  }

  errorMess: string = ''
  succesMess: string = ''

  dodajPosao(): void {
    let datumDate = new Date(this.datum != null ? this.datum : '')
    let datumRadaStr: string = datumDate.getFullYear() + "-" + (datumDate.getMonth()+1) + "-" + datumDate.getDate();
    if (new Date(datumRadaStr) > new Date(this.izabranaFirma.datumPocetkaOdmora) &&
        new Date(datumRadaStr) < new Date(this.izabranaFirma.datumKrajaOdmora)) {
          this.errorMess = 'Nažalost, nismo u mogućnosti da izvršimo zakazivanje zbog godišnjeg odmora firme.\nIzaberite drugi datum ukoliko vam odgovara.'
          return;
    }
    let usluge: Usluga[] = []
    this.izabranaFirma.usluge.forEach((usluga: Usluga) => {
      if (usluga.checked) {
        usluge.push(usluga);
      }
    })
    this.posloviServis.dodajPosao(this.izabranaFirma.naziv, this.trenutniKorisnik.korisnicko_ime, datumRadaStr, this.tipBaste,
      (this.kvadraturaBazena != null) ? this.kvadraturaBazena : 0, this.kvadraturaZelenilaPB != null ? this.kvadraturaZelenilaPB : 0,
      this.kvadraturaLezIStol != null ? this.kvadraturaLezIStol : 0, this.kvadraturaFontana != null ? this.kvadraturaFontana : 0,
      this.kvadraturaZeleniloBR != null ? this.kvadraturaZeleniloBR : 0, this.brojStolovaIStoli != null ? this.brojStolovaIStoli : 0, usluge, this.brojVodenihPovrsina
    ).subscribe(
      mess => {
        if (mess == 'ok') {
          this.brojVodenihPovrsina = 0
          this.brojZelenihPovrsina = 0
          this.brojStolicaILezaljka = 0
          this.succesMess = 'Uspešno ste zakazali uređenje vaše bašte! '
        }
      }
    )
  }
}
