import { Odrzavanje } from "./odrzavanje"
import { Usluga } from "./usluga"

export class Posao {
  IdP: number = 0
  firma: string = ''
  dekorater: string = ''
  vlasnik: string = ''
  status: string = ''
  datumZakazivanja: string = ''
  datumRada: string = ''
  datumZavrsetka: string = ''
  slika: string = ''
  tipBaste: string = ''
  kvadraturaBazenPrivBasta: number = 0
  kvadraturaZeleniloPrivBasta: number = 0
  kvadraturaLezaljkeStoloviPrivBasta: number = 0
  kvadraturaFontanaRestBasta: number = 0
  kvadraturaZeleniloRestBasta: number = 0
  brojStolovaStolicaRestBasta: number = 0
  usluge: Usluga[] = []
  odbili: string[] = []
  komentarOdbijanja: string = ''
  datumZavrsetkaTMP: string = ''
  datumiErrorMess: string = ''
  datumZavrsetkaDate: Date = new Date()
  vlasnikImePrezime: string = ''
  odrzavanja: Odrzavanje[] = []
  mozeOdrzavanje: boolean = false;
  notification: string = ''
  brVodenihPovrsina: number = 0
}
