import { Component } from '@angular/core';
import { ChartType, Legend, plugins } from 'chart.js';
import { ChartData } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Posao } from '../models/posao';
import { Odrzavanje } from '../models/odrzavanje';
import { PosloviService } from '../services/poslovi.service';
import { OdrzavanjaService } from '../services/odrzavanja.service';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-dekorater-statistika',
  templateUrl: './dekorater-statistika.component.html',
  styleUrls: ['./dekorater-statistika.component.css']
})
export class DekoraterStatistikaComponent {

  constructor(private posloviServis: PosloviService, private odrzavanjaServis: OdrzavanjaService,
    private korisniciServis: KorisniciService
  ) {}

  poslovi: Posao[] = []
  odrzavanja: Odrzavanje[] = []

  brojPoslovaPoMesecima: number[] = []

  dekorateriIstaFirma: string[] = []
  posloviIstaFirma: Posao[] = []
  odrzavanjaIstaFirma: Odrzavanje[] = []
  procenatPoZaposlenom: number[] = []

  posloviHistChart: Posao[] = []
  odrzavanjaHistChart: Odrzavanje[] = []
  prosekPoDanima: number[] = []

  trenutniKorisnik: Korisnik = new Korisnik()

  isLessThanTwoYearsAgo(date: Date): boolean {
    const today = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(today.getFullYear() - 2);

    return date > twoYearsAgo;
  }

  countDaysInLastTwoYears(day: number): number {
    let count = 0;
    const today = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(today.getFullYear() - 2);

    for (let d = new Date(twoYearsAgo); d <= today; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === day) {
        count++;
      }
    }

    return count;
  }



  ngOnInit(): void {
    let korImeTmp = localStorage.getItem('logged');
    if (korImeTmp != null) {
      this.korisniciServis.getUserByUsername(korImeTmp).subscribe(
        kor => {
          this.trenutniKorisnik = kor;
          this.posloviServis.getAllZavrseneZaDekorater(this.trenutniKorisnik.korisnicko_ime).subscribe(
            pos => {
              this.poslovi = pos;
              let posloviJan: number = 0;
              let posloviFeb: number = 0;
              let posloviMart: number = 0;
              let posloviApr: number = 0;
              let posloviMaj: number = 0;
              let posloviJun: number = 0;
              let posloviJul: number = 0;
              let posloviAvg: number = 0;
              let posloviSep: number = 0;
              let posloviOkt: number = 0;
              let posloviNov: number = 0;
              let posloviDec: number = 0;
              for (let i = 0; i < this.poslovi.length; i++) {
                this.poslovi[i].datumZavrsetkaDate = new Date(this.poslovi[i].datumZavrsetka)
                switch (this.poslovi[i].datumZavrsetkaDate.toLocaleDateString('sr-Latn-RS', {month: 'long'})) {
                  case 'januar':
                    posloviJan++;
                    break;
                  case 'februar':
                    posloviFeb++;
                    break;
                  case 'mart':
                    posloviMart++;
                    break;
                  case 'april':
                    posloviApr++;
                    break;
                  case 'maj':
                    posloviMaj++;
                    break;
                  case 'jun':
                    posloviJun++;
                    break;
                  case 'jul':
                    posloviJul++;
                    break
                  case 'avgust':
                    posloviAvg++;
                    break;
                  case 'septembar':
                    posloviSep++;
                    break;
                  case 'oktobar':
                    posloviOkt++;
                    break;
                  case 'novembar':
                    posloviNov++;
                    break;
                  case 'decembar':
                    posloviDec++;
                    break;
                  default:
                    break;
                }
              }
              this.odrzavanjaServis.getAllPrihvaceneZaDekoratera(this.trenutniKorisnik.korisnicko_ime).subscribe(
                odrz => {
                  this.odrzavanja = odrz
                  for (let i = 0; i < this.odrzavanja.length; i++) {
                    this.odrzavanja[i].datumZavrsetkaDate = new Date(this.odrzavanja[i].datumZavrsetka);
                    switch (this.odrzavanja[i].datumZavrsetkaDate.toLocaleDateString('sr-Latn-RS', {month: 'long'})) {
                      case 'januar':
                        posloviJan++;
                        break;
                      case 'februar':
                        posloviFeb++;
                        break;
                      case 'mart':
                        posloviMart++;
                        break;
                      case 'april':
                        posloviApr++;
                        break;
                      case 'maj':
                        posloviMaj++;
                        break;
                      case 'jun':
                        posloviJun++;
                        break;
                      case 'jul':
                        posloviJul++;
                        break
                      case 'avgust':
                        posloviAvg++;
                        break;
                      case 'septembar':
                        posloviSep++;
                        break;
                      case 'oktobar':
                        posloviOkt++;
                        break;
                      case 'novembar':
                        posloviNov++;
                        break;
                      case 'decembar':
                        posloviDec++;
                        break;
                      default:
                        break;
                    }
                  }
                  this.brojPoslovaPoMesecima[0] = posloviJan;
                  this.brojPoslovaPoMesecima[1] = posloviFeb;
                  this.brojPoslovaPoMesecima[2] = posloviMart;
                  this.brojPoslovaPoMesecima[3] = posloviApr;
                  this.brojPoslovaPoMesecima[4] = posloviMaj;
                  this.brojPoslovaPoMesecima[5] = posloviJun;
                  this.brojPoslovaPoMesecima[6] = posloviJul;
                  this.brojPoslovaPoMesecima[7] = posloviAvg;
                  this.brojPoslovaPoMesecima[8] = posloviSep;
                  this.brojPoslovaPoMesecima[9] = posloviOkt;
                  this.brojPoslovaPoMesecima[10] = posloviNov;
                  this.brojPoslovaPoMesecima[11] = posloviDec;
                  this.barChartData = {
                    labels: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
                    datasets: [
                      { data: this.brojPoslovaPoMesecima, label: "Broj poslova" }
                    ]
                  }
                  let brojAngazFirma: number = 0
                  this.posloviServis.getAllZavrseneZaFirmu(this.trenutniKorisnik.firma).subscribe(
                    pos => {
                      this.odrzavanjaServis.getAllPrihvaceneZaFirmu(this.trenutniKorisnik.firma).subscribe(
                        odrz => {
                          brojAngazFirma = pos.length + odrz.length;
                          this.korisniciServis.getAllIstaFirma(this.trenutniKorisnik.firma).subscribe(
                            kor => {
                              for (let i = 0; i < kor.length; i++) {
                                kor[i].brojZakPoslova = 0;
                                this.posloviServis.getAllZavrseneZaDekorater(kor[i].korisnicko_ime).subscribe(
                                  pos => {
                                    kor[i].brojZakPoslova += pos.length;
                                    this.odrzavanjaServis.getAllPrihvaceneZaDekoratera(kor[i].korisnicko_ime).subscribe(
                                      odr => {
                                        kor[i].brojZakPoslova += odr.length;
                                        this.dekorateriIstaFirma[i] = kor[i].ime + " " + kor[i].prezime;
                                        if (i == kor.length -1) {
                                          for (let i = 0; i < this.dekorateriIstaFirma.length; i++) {
                                            this.procenatPoZaposlenom[i] = kor[i].brojZakPoslova / brojAngazFirma * 100;
                                          }
                                          this.pieChartData = {
                                            labels: this.dekorateriIstaFirma,
                                            datasets: [
                                              {
                                                data: this.procenatPoZaposlenom,
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    )
                                  }
                                )
                              }

                              const countMondays = this.countDaysInLastTwoYears(1);
                              const countTuesdays = this.countDaysInLastTwoYears(2);
                              const countWednesdays = this.countDaysInLastTwoYears(3);
                              const countThursdays = this.countDaysInLastTwoYears(4);
                              const countFridays = this.countDaysInLastTwoYears(5);
                              const countSaturdays = this.countDaysInLastTwoYears(6);
                              const countSundays = this.countDaysInLastTwoYears(0);

                              let countJobsOnMonday: number = 0
                              let countJobsOnTuesday: number = 0
                              let countJobsOnWednesday: number = 0
                              let countJobsOnThursday: number = 0
                              let countJobsOnFriday: number = 0
                              let countJobsOnSaturday: number = 0
                              let countJobsOnSunday: number = 0

                              this.posloviServis.getAllZavrseneZaDekorater(this.trenutniKorisnik.korisnicko_ime).subscribe(
                                pos => {
                                  pos.forEach((p: Posao) => {
                                    p.datumZavrsetkaDate = new Date(p.datumZavrsetka)
                                    if (this.isLessThanTwoYearsAgo(p.datumZavrsetkaDate)) {
                                      switch (p.datumZavrsetkaDate.toLocaleDateString('sr-Latn-RS', { weekday: 'long' })) {
                                        case 'ponedeljak':
                                          countJobsOnMonday++
                                          break;
                                        case 'utorak':
                                          countJobsOnTuesday++
                                          break;
                                        case 'sreda':
                                          countJobsOnWednesday++
                                          break;
                                        case 'cetvrtak':
                                          countJobsOnThursday++
                                          break;
                                        case 'petak':
                                          countJobsOnFriday++
                                          break
                                        case 'subota':
                                          countJobsOnSaturday++
                                          break
                                        case 'nedelja':
                                          countJobsOnSunday++
                                          break
                                        default:
                                          break;
                                      }
                                    }
                                  })
                                  this.odrzavanjaServis.getAllPrihvaceneZaDekoratera(this.trenutniKorisnik.korisnicko_ime).subscribe(
                                    odrz => {
                                      odrz.forEach((o: Odrzavanje) => {
                                        o.datumZavrsetkaDate = new Date(o.datumZavrsetka)
                                        if (this.isLessThanTwoYearsAgo(o.datumZavrsetkaDate)) {
                                          switch (o.datumZavrsetkaDate.toLocaleDateString('sr-Latn-RS', { weekday: 'long' })) {
                                            case 'ponedeljak':
                                              countJobsOnMonday++
                                              break;
                                            case 'utorak':
                                              countJobsOnTuesday++
                                              break;
                                            case 'sreda':
                                              countJobsOnWednesday++
                                              break;
                                            case 'četvrtak':
                                              countJobsOnThursday++
                                              break;
                                            case 'petak':
                                              countJobsOnFriday++
                                              break
                                            case 'subota':
                                              countJobsOnSaturday++
                                              break
                                            case 'nedelja':
                                              countJobsOnSunday++
                                              break
                                            default:
                                              break;
                                          }
                                        }
                                      })
                                      this.prosekPoDanima[0] = countJobsOnMonday / countMondays;
                                      this.prosekPoDanima[1] = countJobsOnTuesday / countTuesdays;
                                      this.prosekPoDanima[2] = countJobsOnWednesday / countWednesdays;
                                      this.prosekPoDanima[3] = countJobsOnThursday / countThursdays;
                                      this.prosekPoDanima[4] = countJobsOnFriday / countFridays;
                                      this.prosekPoDanima[5] = countJobsOnSaturday / countSaturdays;
                                      this.prosekPoDanima[6] = countJobsOnSunday / countSundays;
                                      this.histogramData = {
                                        datasets: [
                                          {
                                            barPercentage: 1,
                                            categoryPercentage: 1,
                                            label: 'Dani',
                                            data: this.prosekPoDanima,
                                            backgroundColor: 'lightblue',
                                            borderColor: 'blue',
                                            borderWidth: 1
                                          }
                                        ]
                                      }
                                    }
                                  )
                                }
                              )

                            }
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  }

  //Grafici

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Broj poslova po mesecima',
        color: 'black',
        font: {
          size: 22
        }
      }
    }
  };

  public barChartData: ChartData = {
    labels: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
    datasets: [
      { data: [], label: "Broj poslova" }
    ]
  }
  public barChartType: ChartType = 'bar';

  public pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: "Raspodela poslova u okviru firme",
        font: {
          size: 22
        },
        color: "black"
      }
    }

  };

  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };

  public histogramOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Prosek broja poslova po danima u protekla 24 meseca',
        font: {
          size: 16,
        },
        color: '#000000',
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dani'
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Prosek broja poslova'
        },
        grid: {
          display: true
        },
        beginAtZero: true
      }
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderSkipped: false,
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };


  public histogramType: ChartType = 'bar';

  public histogramData: ChartData<'bar'> = {
    labels: ['Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota', 'Nedelja'],
    datasets: [
      {
        barPercentage: 1,
        categoryPercentage: 1,
        label: 'Dani',
        data: [],
        backgroundColor: 'lightblue',
        borderColor: 'blue',
        borderWidth: 1
      }
    ]
  };

  // Dovlacenje podataka

}
