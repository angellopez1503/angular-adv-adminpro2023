import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role():any{
    return this.usuario?.role
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu')

    // TODO: Borrar menu
    google.accounts.id.revoke(this.usuario?.email, () => {
      this.router.navigateByUrl('/login');
    });
  }

  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu))
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        tap((res) => {
          google.accounts.id.initialize({
            client_id:
              '127965276130-e0h5g2hpkfjel4ld1oiiul37evdcqjih.apps.googleusercontent.com',
          });
        }),
        map((res: any) => {
          const { email, google, name, role, img = '', uid } = res.usuario;
          this.usuario = new Usuario(name, email, '', img, google, role, uid);
          this.guardarLocalStorage(res.token,res.menu)
          return true;
        }),

        catchError((err) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
        this.guardarLocalStorage(res.token,res.menu)
      })
    );
  }

  actualizarPerfil(data: { email: string; name: string; role: any }) {
    data = {
      ...data,
      role: this.usuario?.role,
    };

    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((res: any) => {
        this.guardarLocalStorage(res.token,res.menu)
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        // console.log(res);
        console.log(res);
        this.guardarLocalStorage(res.token,res.menu)
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers).pipe(
      map((res) => {
        const usuarios = res.usuarios.map(
          (user) =>
            new Usuario(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return {
          total: res.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
