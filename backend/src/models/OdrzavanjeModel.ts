import mongoose from "mongoose";

const OdrzavanjeSchema = new mongoose.Schema(
    {
        IdP: Number,
        IdO: Number,
        firma: String,
        datumPravljenjaZahtevaOdrzavanja: String,
        datumZavrsetka: String,
        dekorater: String,
        vlasnik:  String,
        status: String,
        brVodenihPovrsina: Number
    }, 
    {
        versionKey: false
    }
)

export default mongoose.model('OdrzavanjeModel', OdrzavanjeSchema, 'odrzavanja');