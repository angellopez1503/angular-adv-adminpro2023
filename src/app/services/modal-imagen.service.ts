import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id: any;
  public img?: string;

  public nuevaImagen:EventEmitter<string> = new EventEmitter<string>()
  public emitReset:EventEmitter<string> = new EventEmitter<string>()
  

  public get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: any,
    img: string = 'no-image'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')){
      this.img = img
    } else{
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
   
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() {}
}
