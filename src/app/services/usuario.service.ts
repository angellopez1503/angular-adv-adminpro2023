import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map, Observable, catchError, of} from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

declare const google: any;
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario?: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token():string{
    return localStorage.getItem('token') || ''
  }

  get uid():string{
    return this.usuario?.uid || ''
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke(this.usuario?.email, () => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean> {
    google.accounts.id.initialize({
      client_id:
        '127965276130-e0h5g2hpkfjel4ld1oiiul37evdcqjih.apps.googleusercontent.com',
    });
     

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const { email, google, name, role, img = '', uid } = res.usuario;
          this.usuario = new Usuario(name, email, '', img, google, role, uid);
          localStorage.setItem('token', res.token);
          return true
        }),
      
        catchError((err) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  actualizarPerfil(data:{email:string,name:string,role:any}){

    data = {
      ...data,
      role:this.usuario?.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    })

  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        // console.log(res);
        console.log(res);
        localStorage.setItem('token', res.token);
      })
    );
  }

  cargarUsuarios(desde:number = 0){
    
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuarios>(url,this.headers)
    .pipe(
      map(
        res => {
         const usuarios = res.usuarios.map(user => new Usuario(user.name,user.email,'',user.img,user.google,user.role,user.uid))
          return {
            total:res.total,
            usuarios
          }
        }
      )
    )
  }

}
