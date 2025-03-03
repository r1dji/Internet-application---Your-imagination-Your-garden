import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisniciRouter from './routers/korisnici.router';
import firmeRouter from './routers/firme.router';
import posloviRouter from './routers/poslovi.router';
import odrzavanjaRouter from './routers/odrzavanja.router';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projekat');
const conn = mongoose.connection;
conn.once('open', () => {
    console.log('DB connected');
})

app.use('/korisnici', korisniciRouter);
app.use('/firme', firmeRouter);
app.use('/poslovi', posloviRouter);
app.use('/odrzavanja', odrzavanjaRouter);

app.listen(4000, () => console.log(`Express server running on port 4000`));