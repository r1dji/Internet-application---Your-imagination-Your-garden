import { Komentar } from "./komentar"
import { Usluga } from "./usluga"

export class Firma {
  naziv: string = ''
  adresa: string = ''
  ocena: number = 0
  telefon: string = ''
  datumPocetkaOdmora: string = ''
  datumKrajaOdmora: string = ''
  kontaktOsoba: string = ''
  status: string = ''
  usluge: Usluga[] = []
  komentari: Komentar[] = []
  zaposleni: string[] = []
}
