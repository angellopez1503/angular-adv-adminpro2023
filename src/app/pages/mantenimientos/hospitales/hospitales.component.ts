import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalFormHospitalService } from '../../../services/modal-form-hospital.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public nuevoHospitalSubs!: Subscription;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalFormHospitalService: ModalFormHospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.nuevoHospitalSubs = this.hospitalService.nuevoHospital
      .pipe(delay(100))
      .subscribe((res) => {

        this.cargarHospitales();
      });
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(120))
      .subscribe((res) => {
        console.log(res);
        this.cargarHospitales();
      });
  }

  ngOnDestroy(): void {
    this.nuevoHospitalSubs.unsubscribe();
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((res) => {
      this.cargando = false;
      this.hospitales = res;
      console.log(this.hospitales);
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.name)
      .subscribe((res) => {
        Swal.fire('Actualizado', hospital.name, 'success');

      });
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Esta a punto de borrar a ${hospital.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id).subscribe((res) => {
          this.cargarHospitales();
          Swal.fire('Borrado', hospital.name, 'success');
        });
      }
    });
  }

  abriModal() {
    this.modalFormHospitalService.abrirModal();
    this.modalImagenService.emitReset.emit();
  }

  abrirModalImagen(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
    this.modalImagenService.emitReset.emit();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarHospitales();
      return;
    }
    this.busquedasService.buscar('hospitales', termino).subscribe((res:any) => {
      this.hospitales = res;
    });
  }

  // async abrirSweetAlert() {
  //   const { value } = await Swal.fire<any>({
  //     title: 'Crear hospital',
  //     text: 'Ingrse el nombre del nuevo hospital',
  //     input: 'text',
  //     inputPlaceholder: 'Nombre del hospital',
  //     showCancelButton: true,
  //     allowOutsideClick: false,
  //   });

  //   if (value?.trim().length > 0) {
  //     this.hospitalService.crearHospital(value).subscribe((res) => {
  //       this.cargarHospitales();
  //     });
  //   }
  // }
}
