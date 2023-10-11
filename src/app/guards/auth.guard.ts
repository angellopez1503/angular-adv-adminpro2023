import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
  
} from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private UsuarioService: UsuarioService,
    private router:Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

   return  this.UsuarioService.validarToken()
               .pipe(
                tap(
                  res => {
                     if(!res){
                      this.router.navigateByUrl('/login')
                     }
                  }
                  
                )
               ) 
    
  }
}
