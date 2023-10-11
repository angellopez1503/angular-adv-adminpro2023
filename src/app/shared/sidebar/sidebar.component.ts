import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  menuItems:any[]
  public  usuario?:Usuario

  constructor(
    private sidebarService:SidebarService,
    private usuarioService:UsuarioService
  ){
    this.menuItems = sidebarService.menu
    this.usuario = usuarioService.usuario
  }

}
