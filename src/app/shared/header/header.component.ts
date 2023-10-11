import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // public imgUrl:any = ''
  public usuario?:Usuario

  constructor(
    private usuarioService:UsuarioService
  ){
    // this.imgUrl = usuarioService.usuario?.imagenUrl
    // console.log(this.imgUrl);
    // this.imgUrl = usuarioService.usuario?.imagenUrl
    this.usuario = usuarioService.usuario
     
  }

  logout(){
    this.usuarioService.logout()
  }



}
