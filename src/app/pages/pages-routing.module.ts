import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data:{title:'Dashboard'}
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data:{title:'ProgressBar'}
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data:{title:'Grafica1'}
      },
      {
        path:'account-settings',
        component:AccountSettingsComponent,
        data:{title:'Ajustes'}
      },
      {
        path:'promesas',
        component:PromesasComponent,
        data:{title:'Promesas'}
      },
      {
        path:'rxjs',
        component:RxjsComponent,
        data:{title:'RxJs'}
      },
      {
        path:'perfil',
        component:PerfilComponent,
        data:{title:'Perfil de usuario'}
      },

      //Mantenimientos
      {
        path:'usuarios',
        component:UsuariosComponent,
        data:{title:'Mantenimiento de Usuarios'}
      },
      {
        path:'hospitales',
        component:HospitalesComponent,
        data:{title:'Mantenimiento de Hospitales'}
      },
      {
        path:'medicos',
        component:MedicosComponent,
        data:{title:'Mantenimiento de Medicos'}
      },
      {
        path:'medico/:id',
        component:MedicoComponent,
        data:{title:'Mantenimiento de Medicos'}

      },


    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

