import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp: any = '';


  constructor(
    public modalImagenService:ModalImagenService
  ){}
 

  cerrarModal(){
    this.imgTemp = null
    this.modalImagenService.cerrarModal()
  }

  cambiarImagen(event: any) {
    const file = event.target.files[0];
    this.imagenSubir = file;

    if (!file) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    };
  }


}
