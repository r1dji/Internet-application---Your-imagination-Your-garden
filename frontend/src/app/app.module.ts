import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { DekoraterComponent } from './dekorater/dekorater.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { PocetnastranaComponent } from './pocetnastrana/pocetnastrana.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { VlasnikregisterComponent } from './vlasnikregister/vlasnikregister.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { PovratakNaPocetnuStranuComponent } from './povratak-na-pocetnu-stranu/povratak-na-pocetnu-stranu.component';
import { AdminZahteviObradaComponent } from './admin-zahtevi-obrada/admin-zahtevi-obrada.component';
import { AdminSpisakKorisnikaComponent } from './admin-spisak-korisnika/admin-spisak-korisnika.component';
import { AdminDodavanjeFirmeComponent } from './admin-dodavanje-firme/admin-dodavanje-firme.component';
import { AdminDodavanjeDekorateraComponent } from './admin-dodavanje-dekoratera/admin-dodavanje-dekoratera.component';
import { MapComponent } from './map/map.component';
import { DekoraterProfilComponent } from './dekorater-profil/dekorater-profil.component';
import { DekoraterZakazivanjaComponent } from './dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterOdrzavanjaComponent } from './dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterStatistikaComponent } from './dekorater-statistika/dekorater-statistika.component';
import { VlasnikProfilComponent } from './vlasnik-profil/vlasnik-profil.component';
import { VlasnikFirmeComponent } from './vlasnik-firme/vlasnik-firme.component';
import { VlasnikZakazivanjaComponent } from './vlasnik-zakazivanja/vlasnik-zakazivanja.component';
import { VlasnikOdrzavanjaComponent } from './vlasnik-odrzavanja/vlasnik-odrzavanja.component';
import { NgChartsModule } from 'ng2-charts';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';


@NgModule({
  declarations: [
    AppComponent,
    VlasnikComponent,
    DekoraterComponent,
    AdministratorComponent,
    PocetnastranaComponent,
    LogoutComponent,
    AdminloginComponent,
    VlasnikregisterComponent,
    PromenalozinkeComponent,
    PovratakNaPocetnuStranuComponent,
    AdminZahteviObradaComponent,
    AdminSpisakKorisnikaComponent,
    AdminDodavanjeFirmeComponent,
    AdminDodavanjeDekorateraComponent,
    MapComponent,
    DekoraterProfilComponent,
    DekoraterZakazivanjaComponent,
    DekoraterOdrzavanjaComponent,
    DekoraterStatistikaComponent,
    VlasnikProfilComponent,
    VlasnikFirmeComponent,
    VlasnikZakazivanjaComponent,
    VlasnikOdrzavanjaComponent,
    ZakazivanjeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
