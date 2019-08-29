import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuard } from './guard/usuario.guard';
import { GraficaComponent } from './pages/grafica/grafica.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { HomeComponent } from './pages/home/home.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { ColasComponent } from './pages/colas/colas.component';

const routes: Routes = 
[
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'mensajes', component: MensajesComponent, canActivate: [UsuarioGuard] },
    { path: 'grafica', component: GraficaComponent },
    { path: 'encuesta', component: EncuestaComponent },
    { path: 'mapa', component: MapaComponent },
    { path: 'colas', component: ColasComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
