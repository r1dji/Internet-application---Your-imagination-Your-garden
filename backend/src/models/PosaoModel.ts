import mongoose from "mongoose";

const PosaoSchema = new mongoose.Schema(
    {
        IdP: Number,
        firma: String,
        dekorater: String,
        vlasnik: String,
        status: String,
        datumZakazivanja: String,
        datumRada: String,
        datumZavrsetka: String,
        slika: String,
        tipBaste: String,
        kvadraturaBazenPrivBasta: Number,
        kvadraturaZeleniloPrivBasta: Number,
        kvadraturaLezaljkeStoloviPrivBasta: Number,
        kvadraturaFontanaRestBasta: Number,
        kvadraturaZeleniloRestBasta: Number,
        brojStolovaStolicaRestBasta: Number,
        usluge: Array,
        odbili: Array,
        brVodenihPovrsina: Number
    }, 
    {
        versionKey: false
    }
)

export default mongoose.model('PosaoModel', PosaoSchema, 'poslovi');