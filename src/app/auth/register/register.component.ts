import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  formSubmitted : boolean = false;

  public registerForm = this.fb.group(
    {
      name: ['Angel', Validators.required],
      email: ['angel@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      password2: ['1234567', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: [
        this.passwordIguales('password', 'password2'),
        this.terminoCheckeado('terminos'),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router
  ) {}

  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    //Relizar la creacion
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      res => {
        this.router.navigateByUrl('/')
      },
      err =>{
        Swal.fire('Error',err.error.msg,'error')
      }
    )
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  terminoCheckeado(terminos: string) {
    return (formGroup: FormGroup) => {
      const termControl = formGroup.get(terminos);
      if (termControl?.value) {
        termControl.setErrors(null);
      } else {
        termControl?.setErrors({ noCheked: true });
      }
    };
  }

  passwordIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
