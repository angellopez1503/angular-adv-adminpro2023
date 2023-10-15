import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';
 

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit, OnDestroy {

  public imagenSubir?: File = undefined;
  public imgTemp: any = '';
  @ViewChild('file') file!: ElementRef<HTMLInputElement>;
  public emitResetSubs!: Subscription;

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.emitResetSubs = this.modalImagenService.emitReset
      .pipe(delay(100))
      .subscribe((res) => {
        this.file.nativeElement.value = '';
        this.imgTemp = null;
        this.imagenSubir = undefined;
      });
  }

  ngOnDestroy(): void {
    this.emitResetSubs.unsubscribe();
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
       
    };
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((data) => {
        if (data.ok) {
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          this.modalImagenService.nuevaImagen.emit(data.nombreArchivo);
          this.cerrarModal();
        } else {
          Swal.fire('Error', data.msg, 'error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
