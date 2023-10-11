import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup 
  public usuario!:Usuario|any

  constructor(
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService,
  ) {

    this.usuario = usuarioService?.usuario

  }

  ngOnInit(): void {

    this.perfilForm = this.formBuilder.group({
      name:[this.usuario.name,Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]]
    })

  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      (res:any) => {
        console.log(res);
        const {name,email} = res.usuario
        this.usuario.name = name
        this.usuario.email = email
      },  
      err=>{
        console.log(err);
      }
    )
  }
}
