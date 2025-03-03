import express from "express";
import { KorisniciKontroler } from "../controllers/korisnici.controller";

const korisniciRouter = express.Router();

korisniciRouter.route('/login').post(
    (req, res) => new KorisniciKontroler().login(req, res)
)

korisniciRouter.route('/getUserByUsername').get(
    (req, res) => new KorisniciKontroler().getUserByUsername(req, res)
)

korisniciRouter.route('/getUserByEmail').get(
    (req, res) => new KorisniciKontroler().getUserByEmail(req, res)
)

korisniciRouter.route('/registerKorisnik').post(
    (req, res) => new KorisniciKontroler().registerKorisnik(req, res)
)

korisniciRouter.route('/promeniLozinku').post(
    (req, res) => new KorisniciKontroler().promeniLozinku(req, res)
)

korisniciRouter.route('/getAllPoTipu').get(
    (req, res) => new KorisniciKontroler().getAllPoTipu(req, res)
)

korisniciRouter.route('/getAllDekorZaFirmu').get(
    (req, res) => new KorisniciKontroler().getAllDekorZaFirmu(req, res)
)

korisniciRouter.route('/getUObradi').get(
    (req, res) => new KorisniciKontroler().getUObradi(req, res)
)

korisniciRouter.route('/promeniStatus').post(
    (req, res) => new KorisniciKontroler().promeniStatus(req, res)
)

korisniciRouter.route('/getAllNoAdmin').get(
    (req, res) => new KorisniciKontroler().getAllNoAdmin(req, res)
)

korisniciRouter.route('/promeniKorIme').post(
    (req, res) => new KorisniciKontroler().promeniKorIme(req, res)
)

korisniciRouter.route('/promeniIme').post(
    (req, res) => new KorisniciKontroler().promeniIme(req, res)
)

korisniciRouter.route('/promeniPrezime').post(
    (req, res) => new KorisniciKontroler().promeniPrezime(req, res)
)

korisniciRouter.route('/promeniPol').post(
    (req, res) => new KorisniciKontroler().promeniPol(req, res)
)

korisniciRouter.route('/promeniAdresu').post(
    (req, res) => new KorisniciKontroler().promeniAdresu(req, res)
)

korisniciRouter.route('/promeniTelefon').post(
    (req, res) => new KorisniciKontroler().promeniTelefon(req, res)
)

korisniciRouter.route('/promeniEmail').post(
    (req, res) => new KorisniciKontroler().promeniEmail(req, res)
)

korisniciRouter.route('/promeniBrKartice').post(
    (req, res) => new KorisniciKontroler().promeniBrKartice(req, res)
)

korisniciRouter.route('/promeniProfSliku').post(
    (req, res) => new KorisniciKontroler().promeniSliku(req, res)
)

korisniciRouter.route('/promeniLozinkuAdmin').post(
    (req, res) => new KorisniciKontroler().promeniLozinkuAdmin(req, res)
)

korisniciRouter.route('/getAllIstaFirma').post(
    (req, res) => new KorisniciKontroler().getAllIstaFirma(req, res)
)

export default korisniciRouter;