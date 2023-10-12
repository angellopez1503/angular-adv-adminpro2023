import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp: any = '';


  constructor(
    public modalImagenService:ModalImagenService,
    public fileUploadService:FileUploadService
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

  subirImagen() {

    const id = this.modalImagenService.id
    const tipo = this.modalImagenService.tipo
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((data) => {
        if (data.ok) {
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          this.modalImagenService.nuevaImagen.emit(data.nombreArchivo)
          this.cerrarModal()
        } else {
          Swal.fire('Error', data.msg, 'error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


}
