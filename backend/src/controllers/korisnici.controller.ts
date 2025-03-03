import express from "express";
import KorisnikModel from "../models/KorisnikModel";
import bcrypt from "bcryptjs";

export class KorisniciKontroler {
    
    login = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        let logintip = req.body.logintip;

        if (logintip == 'normallogin') {
            KorisnikModel.findOne(
            { korisnicko_ime: korisnicko_ime, tip: { $in: ["vlasnik", "dekorater"] } }
        ).then(
            korisnik => {
                if (korisnik != null) {
                    bcrypt.compare(lozinka, (korisnik.lozinka ?? ''), (err, result) => {
                        if (result) {
                            res.json(korisnik);
                        } else {
                            res.json(null);
                        }
                    })
                } else {
                    res.json(null);
                }
            }
        )
        }
        if (logintip == 'adminlogin') {
            KorisnikModel.findOne(
                { korisnicko_ime: korisnicko_ime, tip: "admin" }
            ).then(
                korisnik => {
                    if (korisnik != null) {
                        bcrypt.compare(lozinka, (korisnik.lozinka ?? ''), (err, result) => {
                            if (result) {
                                res.json(korisnik);
                            } else {
                                res.json(null);
                            }
                        })
                    } else {
                        res.json(null);
                    }
                }
            )    
        }
    }

    getUserByUsername = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.query.korime;

        KorisnikModel.findOne(
            { korisnicko_ime: korisnicko_ime }
        ).then(
            korisnik => {
                res.json(korisnik);
            }
        )
    }

    getUserByEmail = (req: express.Request, res: express.Response) => {
        let email = req.query.email;

        KorisnikModel.findOne(
            { email: email }
        ).then(
            kor => {
                res.json(kor)
            }
        )
    }

    registerKorisnik = (req: express.Request, res: express.Response) => {

        const profilnaDefault = 'data:image/jpeg;base64,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' 

        let korisnicko_ime = req.body.korIme;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let email = req.body.email;
        let profilna_slika = req.body.profSlika;
        if (profilna_slika == '') {
            profilna_slika = profilnaDefault;
        }
        let broj_kartice = req.body.brKartice;
        let tip = req.body.tip;
        let status = req.body.status;
        let firma = req.body.firma;

        bcrypt.hash(lozinka, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
            }
            else {

                KorisnikModel.create(
                {
                    korisnicko_ime: korisnicko_ime,
                    lozinka: hashedPassword,
                    ime: ime,
                    prezime: prezime,
                    pol: pol,
                    adresa: adresa,
                    telefon: telefon,
                    email: email,
                    profilna_slika: profilna_slika,
                    broj_kartice: broj_kartice,
                    tip: tip,
                    status: status,
                    firma: firma
                }
                ).then(
                    mess => {
                        res.json("ok");
                    }
                )
            }
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;
        let staraLozinka = req.body.staraLozinka;
        let novaLozinka = req.body.novaLozinka;

        KorisnikModel.findOne(
            { korisnicko_ime: korIme }
        ).then(
            korisnik => {
                if (korisnik != null) {
                    bcrypt.compare(staraLozinka, (korisnik.lozinka ?? ''), (err, result) => {
                        if (err) {
                            res.json('err')
                        } else {
                            if (result) {
                                console.log(staraLozinka)
                                bcrypt.hash(novaLozinka, 10, (err, hashedPassword) => {
                                if (err) {
                                    res.json('err')    
                                } else {
                                    KorisnikModel.updateOne(
                                        { korisnicko_ime: korIme },
                                        { $set: { lozinka: hashedPassword }}
                                    ).then(
                                        mess => {
                                            res.json('ok');
                                        }
                                    )
                                }
                            })
                            }  else {
                                res.json('err')
                            } 
                        }
                    })
                } else {
                    res.json('err')
                }
            }                    
        )

    }

    getAllPoTipu = (req: express.Request, res: express.Response) => {
        let tip = req.query.tip;

        KorisnikModel.find(
            { tip: tip, status: "aktivan" }
        ).then(
            korisnici => {
                res.json(korisnici);
            }
        )
    }

    getAllDekorZaFirmu = (req: express.Request, res: express.Response) => {
        let firma = req.query.firma;

        KorisnikModel.find(
            { tip: "dekorater", firma: firma, status: "aktivan"}
        ).then(
            kor => {
                res.json(kor);
            }
        )
    }

    getUObradi = (req: express.Request, res: express.Response) => {
        KorisnikModel.find(
            { status: "u obradi" }
        ).then(
            korisnici => {
                res.json(korisnici);
            }
        )
    }

    promeniStatus = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korIme;
        let statusN = req.body.statusN;
        
        KorisnikModel.updateOne(
            { korisnicko_ime: korisnik}, 
            { $set: { status: statusN }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    getAllNoAdmin = (req: express.Request, res: express.Response) => {

        KorisnikModel.find(
            { tip: {  $in: ["vlasnik", "dekorater"]}, status: { $in: ["aktivan", "blokiran"]} }
        ).then(
            korisnik => {
                res.json(korisnik);
            }
        )
    }

    promeniSliku = (req: express.Request, res: express.Response) => {
        let novaSlika = req.body.novaSlika;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { profilna_slika: novaSlika }}
        ).then(
            mess => {
                console.log('ok')
                res.json('ok');
            }
        )
    }

    promeniKorIme = (req: express.Request, res: express.Response) => {
        let korImeNovo = req.body.korImeNovo;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { korisnicko_ime: korImeNovo }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniIme = (req: express.Request, res: express.Response) => {
        let novoIme = req.body.param;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { ime: novoIme }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniPrezime = (req: express.Request, res: express.Response) => {
        let novoPrezime = req.body.param;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { prezime: novoPrezime }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniPol = (req: express.Request, res: express.Response) => {
        let polN = req.body.param;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { pol: polN }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniTelefon = (req: express.Request, res: express.Response) => {
        let telefonN = req.body.param;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { telefon: telefonN }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniAdresu = (req: express.Request, res: express.Response) => {
        let adresaN = req.body.param;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { adresa: adresaN }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniEmail = (req: express.Request, res: express.Response) => {
        let emailN = req.body.param;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { email: emailN }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniBrKartice = (req: express.Request, res: express.Response) => {
        let brKartice = req.body.param;
        let korIme = req.body.korIme;
        KorisnikModel.updateOne(
            { korisnicko_ime: korIme },
            { $set: { broj_kartice: brKartice }}
        ).then(
            mess => {
                res.json('ok');
            }
        )
    }

    promeniLozinkuAdmin = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;
        let staraLozinka = req.body.staraLozinka;
        let novaLozinka = req.body.novaLozinka;

        bcrypt.hash(novaLozinka, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err)
            } else {
                KorisnikModel.updateOne(
                    { korisnicko_ime: korIme, lozinka: staraLozinka },
                    { $set: { lozinka: hashedPassword }}
                ).then(
                    mess => {
                        res.json('ok');
                    }
                )
            }
        })
    }

    getAllIstaFirma = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;

        KorisnikModel.find(
            { firma: firma }
        ).then(
            kor => {
                res.json(kor);
            }
        )
    }

}