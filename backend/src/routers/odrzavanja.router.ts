import express from "express";
import { OdrzavanjeKontroler } from "../controllers/odrzavanja.controller";

const odrzavanjaRouter = express.Router();

odrzavanjaRouter.route('/getAllNeobOdrzavanjaZaFirmu').post(
    (req, res) => new OdrzavanjeKontroler().getAllNeobOdrzavanjaZaFirmu(req, res)
)

odrzavanjaRouter.route('/prihvatiOdrzavanje').post(
    (req, res) => new OdrzavanjeKontroler().prihvatiOdrzavanje(req, res)
)
odrzavanjaRouter.route('/getAllPrihvaceneZaDekoratera').post(
    (req, res) => new OdrzavanjeKontroler().getAllPrihvaceneZaDekoratera(req, res)
)

odrzavanjaRouter.route('/getAllPrihvaceneZaFirmu').post(
    (req, res) => new OdrzavanjeKontroler().getAllPrihvaceneZaFirmu(req, res)
)

odrzavanjaRouter.route('/getAllZaPosao').post(
    (req, res) => new OdrzavanjeKontroler().getAllZaPosao(req, res)
)

odrzavanjaRouter.route('/kreirajOdrzavanje').post(
    (req, res) => new OdrzavanjeKontroler().kreirajOdrzavanje(req, res)
)

export default odrzavanjaRouter;