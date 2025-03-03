import express from "express";
import { FirmeKontroler } from "../controllers/firme.controller";

const firmeRouter = express.Router()

firmeRouter.route('/getAll').get(
    (req, res) => new FirmeKontroler().getAll(req, res)
)

firmeRouter.route('/pretrazi').post(
    (req, res) => new FirmeKontroler().pretrazi(req, res)
)

firmeRouter.route('/dodajFirmu').post(
    (req, res) => new FirmeKontroler().dodajFirmu(req, res)
)

firmeRouter.route('/getFirmByName').post(
    (req, res) => new FirmeKontroler().getFirmByName(req, res)
)

firmeRouter.route('/promeniNaziv').post(
    (req, res) => new FirmeKontroler().promeniNaziv(req, res)
)

firmeRouter.route('/promeniAdresu').post(
    (req, res) => new FirmeKontroler().promeniAdresu(req, res)
)

firmeRouter.route('/promeniOcenu').post(
    (req, res) => new FirmeKontroler().promeniOcenu(req, res)
)

firmeRouter.route('/promeniTelefon').post(
    (req, res) => new FirmeKontroler().promeniTelefon(req, res)
)

firmeRouter.route('/promeniKontaktOsobu').post(
    (req, res) => new FirmeKontroler().promeniKontaktOsobu(req, res)
)

firmeRouter.route('/promeniDatPocOdmora').post(
    (req, res) => new FirmeKontroler().promeniDatumPocetkaOdmora(req, res)
)

firmeRouter.route('/promeniDatKrajOdmora').post(
    (req, res) => new FirmeKontroler().promeniDatumKrajaOdmora(req, res)
)

firmeRouter.route('/promeniNazivUsluge').post(
    (req, res) => new FirmeKontroler().promeniNazivUsluge(req, res)
)

firmeRouter.route('/promeniCenuUsluge').post(
    (req, res) => new FirmeKontroler().promeniCenuUsluge(req, res)
)

firmeRouter.route('/obrisiKomentar').post(
    (req, res) => new FirmeKontroler().obrisiKomentar(req, res)
)

firmeRouter.route('/dodajUslugu').post(
    (req, res) => new FirmeKontroler().dodajUslugu(req, res)
)

firmeRouter.route('/dodajKomentar').post(
    (req, res) => new FirmeKontroler().dodajKomentar(req, res)
)

export default firmeRouter;