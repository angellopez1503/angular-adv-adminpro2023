import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu : Array<any> = []

  public cargarMenu(){
    const menuStore = localStorage.getItem('menu') ?? []
    this.menu = JSON.parse(menuStore.toString())
  }


  // menu:any[] = [
  //   {
  //     title:'Dashboard',
  //     icon:'mdi mdi-gauge',
  //     submenu:[
  //       {
  //         title:'Main',
  //         url:'/'
  //       },
  //       {
  //         title:'ProgressBar',
  //         url:'progress'
  //       },
  //       {
  //         title:'Graficas',
  //         url:'grafica1'
  //       },
  //       {
  //         title:'Promesas',
  //         url:'promesas'
  //       },
  //       {
  //         title:'rxjs',
  //         url:'rxjs'
  //       }
  //     ]
  //   },
  //   {
  //     title:'Mantenimientos',
  //     icon:'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {
  //         title:'Usuarios',
  //         url:'usuarios'
  //       },
  //       {
  //         title:'Hospitales',
  //         url:'hospitales'
  //       },
  //       {
  //         title:'Medicos',
  //         url:'medicos'
  //       },

  //     ]
  //   }

  // ]


  constructor() { }
}
