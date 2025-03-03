import mongoose from "mongoose";

const KorisnikSchema = new mongoose.Schema(
    {
        korisnicko_ime: String,
        lozinka: String,
        ime: String,
        prezime: String,
        pol: String,
        adresa: String,
        telefon: String,
        email: String,
        profilna_slika: String,
        broj_kartice: String,
        tip: String,
        status: String,
        firma: String
    },
    {
        versionKey: false
    }
)

export default mongoose.model('KorisnikModel', KorisnikSchema, 'korisnici');

