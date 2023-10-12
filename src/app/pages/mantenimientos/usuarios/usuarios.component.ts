import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService:ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedasService.buscar('usuarios', termino).subscribe((res) => {
      this.usuarios = res;
    });
  }

  eliminarUsuario(usuario: Usuario) {

    if(usuario.uid === this.usuarioService.uid){
      Swal.fire('Error','No puede borrarse asi mismo','error')
      return  
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((res) => {
          Swal.fire(
            'Usuario borrado',
            `${usuario.name} fue eliminado correctamente`,
            'success'
          );
          this.cargarUsuarios();
        });
      }
    });
  }

  cambiarRole(usuario:Usuario){
     this.usuarioService.guardarUsuario(usuario).subscribe(
      res => {
        console.log(res);
      }
     )
  }

  abrirModal(usuario:Usuario){
    console.log(usuario);
    this.modalImagenService.abrirModal()
  }

}
