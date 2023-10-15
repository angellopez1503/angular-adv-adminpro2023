import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;
  public imgSubs!:Subscription

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalImagenService:ModalImagenService
  ) {}

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id)
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find((hospital) => hospital._id === hospitalId);

    });

    this.imgSubs = this.modalImagenService.nuevaImagen
          .pipe(
            delay(100)
          )
          .subscribe(
            res =>{
              console.log(this.medicoSeleccionado);
              console.log("tick");
              this.cargarMedico(this.medicoSeleccionado?._id)
            }
          )

  }

  cargarMedico(id: any) {
    if(id === 'nuevo'){
      return
    }
    this.medicoService.obtenerMedicoPorId(id)
    .pipe(
      delay(100)
    )
    .subscribe(
      (res: any) => {
        const {
          name,
          hospital: { _id },
        } = res;
        this.medicoSeleccionado = res;
        this.medicoForm.setValue({ name, hospital: _id });
      },
      (err) => {
        this.router.navigateByUrl(`/dashboard/medicos`);
      }
    );
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((res: Hospital[]) => {
      this.hospitales = res;
    });
  }

  guardarMedico() {
    console.log(this.medicoSeleccionado);
    const { name } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id:this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe(
        res => {
          Swal.fire('Actualizado', `${name} actualizado correctamente`, 'success');
          console.log(res);
        }
      )
    } else {

      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((res: any) => {
          console.log(res);
          Swal.fire('Creado', `${name} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`);
        });
    }
  }

  abrirModalImagen(medico:Medico){
     this.modalImagenService.abrirModal('medicos',medico._id,medico.img)
     this.modalImagenService.emitReset.emit()

  }
}
