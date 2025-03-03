import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnastranaComponent } from './pocetnastrana/pocetnastrana.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { DekoraterComponent } from './dekorater/dekorater.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { VlasnikregisterComponent } from './vlasnikregister/vlasnikregister.component';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { AdminZahteviObradaComponent } from './admin-zahtevi-obrada/admin-zahtevi-obrada.component';
import { AdminSpisakKorisnikaComponent } from './admin-spisak-korisnika/admin-spisak-korisnika.component';
import { AdminDodavanjeDekorateraComponent } from './admin-dodavanje-dekoratera/admin-dodavanje-dekoratera.component';
import { AdminDodavanjeFirmeComponent } from './admin-dodavanje-firme/admin-dodavanje-firme.component';
import { DekoraterProfilComponent } from './dekorater-profil/dekorater-profil.component';
import { DekoraterZakazivanjaComponent } from './dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterOdrzavanjaComponent } from './dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterStatistikaComponent } from './dekorater-statistika/dekorater-statistika.component';
import { VlasnikProfilComponent } from './vlasnik-profil/vlasnik-profil.component';
import { VlasnikFirmeComponent } from './vlasnik-firme/vlasnik-firme.component';
import { VlasnikZakazivanjaComponent } from './vlasnik-zakazivanja/vlasnik-zakazivanja.component';
import { VlasnikOdrzavanjaComponent } from './vlasnik-odrzavanja/vlasnik-odrzavanja.component';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';

const routes: Routes = [
  {path: '', component: PocetnastranaComponent},
  {
    path: 'vlasnik', component: VlasnikComponent,
    children: [
      {path: 'profil', component: VlasnikProfilComponent},
      {path: 'firme', component: VlasnikFirmeComponent},
      {path: 'zakazivanja', component: VlasnikZakazivanjaComponent},
      {path: 'odrzavanja', component: VlasnikOdrzavanjaComponent},
      {path: '', redirectTo: 'profil', pathMatch: 'full'}
    ]
  },
  {
    path: 'admin', component: AdministratorComponent,
    children: [
      {path: 'zahtevi', component: AdminZahteviObradaComponent},
      {path: 'svikorisnici', component: AdminSpisakKorisnikaComponent},
      {path: 'dodavanjeDekoratera', component: AdminDodavanjeDekorateraComponent},
      {path: 'dodavanjeFirme', component: AdminDodavanjeFirmeComponent},
      {path: '', redirectTo: 'zahtevi', pathMatch: 'full'}
    ]
  },
  {
    path: 'dekorater', component: DekoraterComponent,
    children: [
      {path: 'profil', component: DekoraterProfilComponent},
      {path: 'zakazivanja', component: DekoraterZakazivanjaComponent},
      {path: 'odrzavanja', component: DekoraterOdrzavanjaComponent},
      {path: 'statistika', component: DekoraterStatistikaComponent},
      {path: '', redirectTo: 'profil', pathMatch: 'full'}
    ]
  },
  {path: 'adminlogin', component: AdminloginComponent},
  {path: 'vlasnikregister', component: VlasnikregisterComponent},
  {path: 'promenalozinke', component: PromenalozinkeComponent},
  {path: 'zakazivanje', component: ZakazivanjeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
