import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {


  constructor(
    public modalImagenService:ModalImagenService
  ){}
 

  cerrarModal(){
    this.modalImagenService.cerrarModal()
  }


}
