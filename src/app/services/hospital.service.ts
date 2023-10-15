import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {

  public nuevoHospital:EventEmitter<any>= new EventEmitter<any>()

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  crearHospital(name:any) {
    const url = `${base_url}/hospitales`;
    return this.http.post(url, { name }, this.headers);
  }

  actualizarHospital(_id: string|undefined, name: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, { name }, this.headers);
  }

  borrarHospital(_id: string|undefined) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http
      .get(url, this.headers)
      .pipe(map((res: any) => res.hospitales));
  }
}
