import express from "express";
import OdrzavanjeModel from "../models/OdrzavanjeModel";
import KorisnikModel from "../models/KorisnikModel";

export class OdrzavanjeKontroler {

  getAllNeobOdrzavanjaZaFirmu = (req: express.Request, res: express.Response) => {
      let firma = req.body.firma;
      
      OdrzavanjeModel.find(
          { firma: firma, status: "u obradi" }
      ).then(
          mess => {
              res.json(mess);
          }
      )
  }

  prihvatiOdrzavanje = (req: express.Request, res: express.Response) => {
    let idO = req.body.idO;
    let dekorater = req.body.dekorater;
    let datumZavrsetka = req.body.datumZavrsetka;

    OdrzavanjeModel.updateOne(
      { IdO: idO },
      { $set: { dekorater: dekorater, datumZavrsetka: datumZavrsetka, status: "prihvacen" }}
    ).then(
      mess => {
        res.json('ok');
      }
    )
  }

  getAllPrihvaceneZaDekoratera = (req: express.Request, res: express.Response) => {
    let dekorater = req.body.dekorater;
    
    OdrzavanjeModel.find(
      { dekorater: dekorater, status: "prihvacen", datumZavrsetka: { $ne: "" }}
    ).then(
      odrzavanja => {
        res.json(odrzavanja);
      }
    )
  } 

  getAllPrihvaceneZaFirmu = (req: express.Request, res: express.Response) => {
    let firma = req.body.firma;

    OdrzavanjeModel.find(
      { firma: firma, status: "prihvacen", datumZavrsetka: { $ne: "" }}
    ).then(
      odrz => {
        res.json(odrz);
      }
    )
  }

  getAllZaPosao = (req: express.Request, res: express.Response) => {
    let idP = req.body.idP;

    OdrzavanjeModel.find(
      { IdP: idP}
    ).then(
      odrzavanja => {
        res.json(odrzavanja)
      }
    )
  }

  kreirajOdrzavanje = (req: express.Request, res: express.Response) => {
    let idP = req.body.idP;
    let brVodenihPovrsina = req.body.brVodenihPovrsina;
    let firma = req.body.firma;
    let vlasnik = req.body.vlasnik

    let datum = new Date()
    let datumStr = datum.getFullYear() + "-" + (datum.getMonth()+1) + "-" + datum.getDate();
    
    OdrzavanjeModel.find(
      { }
    ).then (
      odr => {
        let maxId: number = 0
        for (let i = 0; i < odr.length; i++) {
          if ((odr[i].IdO ?? 0) > maxId) {
            maxId = (odr[i].IdO ?? 0)
          }
        }
        OdrzavanjeModel.create(
          {
            IdO: (maxId + 1),
            IdP: idP,
            firma: firma,
            vlasnik: vlasnik,
            datumPravljenjaZahtevaOdrzavanja: datumStr,
            status: "u obradi",
            datumZavrsetka: "",
            brVodenihPovrsina: brVodenihPovrsina,
            dekorater: "" 
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