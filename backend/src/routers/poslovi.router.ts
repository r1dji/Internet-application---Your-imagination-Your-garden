import express from "express";
import { PosloviKontroler } from "../controllers/poslovi.controller";

const posloviRouter = express.Router()

posloviRouter.route('/getAllZavrsene').get(
    (req, res) => new PosloviKontroler().getAllZavrsene(req, res)
)

posloviRouter.route('/getAllZavrsZak').get(
    (req, res) => new PosloviKontroler().getAllZavrsIZak(req, res)
)

posloviRouter.route('/dohvatiSveUObrNeOdbili').post(
    (req, res) => new PosloviKontroler().dohvatiSveUObrNeOdbili(req, res)
)

posloviRouter.route('/prihvatiPosao').post(
    (req, res) => new PosloviKontroler().prihvatiPosao(req, res)
)

posloviRouter.route('/odbaciPosao').post(
    (req, res) => new PosloviKontroler().odbaciPosao(req, res)
)

posloviRouter.route('/getAllZakazaneZaDekoratera').post(
    (req, res) => new PosloviKontroler().getAllZakazaneZaDekoratera(req, res)
)

posloviRouter.route('/getAllZavrseneIZakazaneZaFirmu').post(
    (req, res) => new PosloviKontroler().getAllZavrseneIZakazaneZaFirmu(req, res)
)

posloviRouter.route('/getAllZaVlasnika').post(
    (req, res) => new PosloviKontroler().getAllZaVlasnika(req, res)
)

posloviRouter.route('/getAllZaVlasnikaObradjene').post(
    (req, res) => new PosloviKontroler().getAllZaVlasnikaObradjene(req, res)
)

posloviRouter.route('/dodajPosao').post(
    (req, res) => new PosloviKontroler().dodajPosao(req, res)
)

posloviRouter.route('/zavrsiPosao').post(
    (req, res) => new PosloviKontroler().zavrsiPosao(req, res)
)

posloviRouter.route('/getAllZakazaneIUObrZaVlasnika').post(
    (req, res) => new PosloviKontroler().getAllZakazaneIUObrZaVlasnika(req, res)
)

posloviRouter.route('/getAllZavrseneZaVlasnika').post(
    (req, res) => new PosloviKontroler().getAllZavrseneZaVlasnika(req, res)
)

posloviRouter.route('/getAllZavrseneZaDekorater').post(
    (req, res) => new PosloviKontroler().getAllZavrseneZaDekorater(req, res)
)

posloviRouter.route('/getAllZavrseneZaFirmu').post(
    (req, res) => new PosloviKontroler().getAllZavrseneZaFirmu(req, res)
)

export default posloviRouter;