import express from "express";
import FirmaModel from "../models/FirmaModel";
import KorisnikModel from "../models/KorisnikModel";

export class FirmeKontroler {

    getAll = (req: express.Request, res: express.Response) => {
        FirmaModel.find(
            { }
        ).then(
            firme => {
                res.json(firme);
            }
        )    
    }

    pretrazi = (req: express.Request, res: express.Response) => {
        let nazivParam = req.body.nazivParam;
        let adresaParam = req.body.adresaParam;

        FirmaModel.find(
            { naziv: { $regex: nazivParam }, adresa: { $regex: adresaParam }}
        ).then(
            firme => {
                res.json(firme);
            }
        )
    }

    dodajFirmu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let adresa = req.body.adresa;
        let kontaktOsoba = req.body.kontaktOsoba;
        let telefon = req.body.telefon;
        let datumPocOdmora = req.body.datumPocOdmora;
        let datumKrajOdmora = req.body.datumKrajOdmora;
        let usluge = req.body.usluge;

        FirmaModel.create(
            {
                naziv: naziv,
                adresa: adresa,
                kontaktOsoba: kontaktOsoba,
                telefon: telefon,
                datumPocetkaOdmora: datumPocOdmora,
                datumKrajaOdmora: datumKrajOdmora,
                usluge: usluge,
                ocena: 0,
                komentari: []
            }
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    getFirmByName = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        FirmaModel.findOne(
            {naziv: naziv}
        ).then(
            firma => {
                res.json(firma);
            }
        )
    }

    promeniNaziv = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let param = req.body.param;
        
        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { naziv : param }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniAdresu = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let param = req.body.param;
        
        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { adresa : param }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniOcenu = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let param = req.body.param;

        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { ocena : param }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniTelefon = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let param = req.body.param;

        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { telefon : param }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniKontaktOsobu = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let param = req.body.param;

        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { kontaktOsoba : param }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniDatumPocetkaOdmora = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let param = req.body.param;

        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { datumPocetkaOdmora : param }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniDatumKrajaOdmora = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let param = req.body.param;

        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { datumKrajaOdmora : param }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniNazivUsluge = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let nazivUsluge = req.body.nazivUsluge;
        let param = req.body.param;

        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { "usluge.$[u].naziv" : param}},
            { arrayFilters: [{ "u.naziv": nazivUsluge }]}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniCenuUsluge = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let nazivUsluge = req.body.nazivUsluge;
        let param = req.body.param;

        FirmaModel.updateOne(
            { naziv: firma },
            { $set: { "usluge.$[u].cena": param }},
            { arrayFilters: [{ "u.naziv": nazivUsluge }]}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    obrisiKomentar = (req: express.Request, res: express.Response) => {
        let firma = req.body.nazivFirme;
        let korisnik = req.body.param;
        let sadrzaj = req.body.sadrzaj;

        FirmaModel.updateOne(
            { naziv: firma },
            { $pull: { komentari: { korisnik: korisnik, sadrzaj: sadrzaj}}}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    dodajUslugu = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        let nazivUsluge = req.body.nazivUsluge;
        let cena = req.body.cenaUsluge;

        const usluga = {naziv: nazivUsluge, cena: cena};

        FirmaModel.updateOne(
            { naziv: firma },
            { $push: { usluge: usluga }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    dodajKomentar = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        let korisnik = req.body.korisnik;
        let sadrzaj = req.body.sadrzaj; 

        const komentar = { korisnik: korisnik, sadrzaj: sadrzaj };

        FirmaModel.updateOne(
            { naziv: firma },
            { $push: { komentari: komentar }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }
}