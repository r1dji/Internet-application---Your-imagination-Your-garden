import express from "express";
import PosaoModel from "../models/PosaoModel";

export class PosloviKontroler {

    getAllZavrsene = (req: express.Request, res: express.Response) => {
        PosaoModel.find(
            { status: "zavrsen" }
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    getAllZakazaneIUObrZaVlasnika = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        PosaoModel.find(
            { vlasnik: vlasnik, status: { $in: ["u obradi", "zakazan"]}}
        ).then (
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    getAllZavrseneZaVlasnika = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        PosaoModel.find(
            { vlasnik: vlasnik, status: "zavrsen" }
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    } 

    getAllZavrsIZak = (req: express.Request, res: express.Response) => {
        PosaoModel.find(
            { status: { $in: ["zavrsen", "zakazan"]} }
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    dohvatiSveUObrNeOdbili = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        let korIme = req.body.korIme;

        PosaoModel.find(
            { firma: firma, status: "u obradi", odbili: { $nin: [korIme]}}
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    prihvatiPosao = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        let dekorater = req.body.dekorater;
        let datumZavrsetka = req.body.datumZavrsetka;

        PosaoModel.updateOne(
            { IdP: idP },
            { $set: { dekorater: dekorater, datumZavrsetka: datumZavrsetka, status: "zakazan" } }
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    odbaciPosao = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;

        let korIme = req.body.dekorater;

        PosaoModel.updateOne(
            { IdP: idP },
            { $push: { odbili: korIme } }
        ).then(
            mess => {
                res.json('ok');
            }
        )
    } 

    getAllZakazaneZaDekoratera = (req: express.Request, res: express.Response) => {
        let dekorater = req.body.dekorater;
        
        PosaoModel.find(
            { dekorater: dekorater, status: "zakazan", datumZavrsetka: { $ne: "" }}
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    //KRITICNA
    getAllZavrseneIZakazaneZaFirmu = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;

        PosaoModel.find(
            { firma: firma, status: "zakazan", datumZavrsetka: { $ne: "" } }
        ).then(
            pos => {
                res.json(pos);
            }
        )
    }

    getAllZaVlasnika = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        PosaoModel.find(
            { vlasnik: vlasnik }
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    //KRITICNA
    getAllZaVlasnikaObradjene = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        PosaoModel.find(
            { vlasnik: vlasnik, status: "zakazan" }
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    zavrsiPosao = (req: express.Request, res: express.Response) => {
        let idP = req.body.idp;

        PosaoModel.updateOne(
            { IdP: idP },
            { $set: { status: "zavrsen" }}
        ).then(
            mess => {
                res.json('ok')
            }
        )
    }

    getAllZavrseneZaDekorater = (req: express.Request, res: express.Response) => {
        let dekorater = req.body.dekorater;

        PosaoModel.find(
            { dekorater: dekorater, status: "zavrsen" }
        ).then (
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    getAllZavrseneZaFirmu = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;

        PosaoModel.find(
            { firma: firma, status: "zavrsen" }
        ).then(
            poslovi => {
                res.json(poslovi);
            }
        )
    }

    dodajPosao = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        let vlasnik = req.body.vlasnik;
        //IDP, Status, 
        let datumRada = req.body.datumRada;
        let datumZak = new Date();
        let datumZakStr = datumZak.getFullYear() + "-" + (datumZak.getMonth() + 1) + "-" + datumZak.getDate();
        let tipBaste = req.body.tipBaste;
        let kvadraturaBazenPrivBasta = -1
        let kvadraturaZeleniloPrivBasta = -1
        let kvadraturaLezaljkeStoloviPrivBasta = -1
        let kvadraturaFontanaRestBasta = -1
        let kvadraturaZeleniloRestBasta = -1
        let brojStolovaStolicaRestBasta = -1
        let usluge = req.body.usluge;
        let brVodenihPovrsina = req.body.brVodenihPovrs;
        if (tipBaste == 'privatna basta') {
            kvadraturaBazenPrivBasta = req.body.kvadraturaBazen;
            kvadraturaZeleniloPrivBasta = req.body.kvadraturaZeleniloPrivBasta;
            kvadraturaLezaljkeStoloviPrivBasta = req.body.kvadrLezStol;
        } else if (tipBaste == 'basta restorana') {
            kvadraturaFontanaRestBasta = req.body.kvadraturaFontRestBasta;
            kvadraturaZeleniloRestBasta = req.body.kvadraturaZeleniloRestBasta;
            brojStolovaStolicaRestBasta = req.body.brojStolovaRestBasta;
        }

        PosaoModel.find(
            { }
        ).then(
            poslovi => {
                let idMax: number = 0;
                poslovi.forEach((posao) => {
                    if (posao.IdP != null) {
                        if (posao.IdP > idMax) {
                            idMax = posao.IdP;
                        }
                    }
                })

                PosaoModel.create(
                    {
                        IdP: (idMax+1),
                        firma: firma,
                        vlasnik: vlasnik,
                        status: "u obradi", 
                        datumZakazivanja: datumZakStr,
                        datumRada: datumRada,
                        tipBaste: tipBaste,
                        kvadraturaBazenPrivBasta: kvadraturaBazenPrivBasta,
                        kvadraturaZeleniloPrivBasta: kvadraturaZeleniloPrivBasta,
                        kvadraturaLezaljkeStoloviPrivBasta: kvadraturaLezaljkeStoloviPrivBasta,
                        kvadraturaFontanaRestBasta: kvadraturaFontanaRestBasta,
                        kvadraturaZeleniloRestBasta: kvadraturaZeleniloRestBasta,
                        brojStolovaStolicaRestBasta: brojStolovaStolicaRestBasta,
                        usluge: usluge,
                        brVodenihPovrsina: brVodenihPovrsina
                    }
                ).then(
                    mess => {
                        res.json('ok');
                    }
                )
            }
        )
    }
}