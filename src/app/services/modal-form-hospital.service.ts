import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalFormHospitalService {

  private _ocultarModal:boolean = true

  public emitReset:EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  public get ocultarModal(){
     return this._ocultarModal
  }

  abrirModal(){
    this._ocultarModal = false
  }

  cerrarModal(){
    this._ocultarModal = true
  }


}
