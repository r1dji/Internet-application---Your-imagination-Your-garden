import mongoose from "mongoose";

const FirmaSchema = new mongoose.Schema(
    {
        naziv: String,
        adresa: String,
        ocena: Number,
        telefon: String,
        datumPocetkaOdmora: String,
        datumKrajaOdmora: String,
        kontaktOsoba: String,
        usluge: Array,
        komentari: Array
    }, 
    {
        versionKey: false
    }
)

export default mongoose.model('FirmaModel', FirmaSchema, 'firme');