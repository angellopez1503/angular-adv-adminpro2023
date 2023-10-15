import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = false;
  public imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

 ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(120))
      .subscribe((res) => {
        this.cargarMedicos();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((res) => {
      this.cargando = false;
      this.medicos = res;
      console.log(this.medicos);
    });
  }

  abrirModalImagen(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
    this.modalImagenService.emitReset.emit();
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.cargarMedicos()
      return
    }
    this.busquedasService.buscar('medicos',termino).subscribe(
      (res:any) => {
        this.medicos = res
      }
    )
  }

  borrarMedico(medico:Medico){
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar a ${medico.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe((res) => {
          this.cargarMedicos();
          Swal.fire('Borrado', medico.name, 'success');
        });
      }
    });
  }
}
