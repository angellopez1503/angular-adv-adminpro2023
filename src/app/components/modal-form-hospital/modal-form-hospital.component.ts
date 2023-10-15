import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ModalFormHospitalService } from '../../services/modal-form-hospital.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { Subscription, pipe, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-form-hospital',
  templateUrl: './modal-form-hospital.component.html',
  styleUrls: ['./modal-form-hospital.component.css'],
})
export class ModalFormHospitalComponent implements OnInit, OnDestroy {
  public formSubmitted: boolean = false;
  public emitResetSubs!: Subscription;
  @ViewChild('txtName') txtName!: ElementRef;

  public registerForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private hospitalService: HospitalService,
    public modalFormHospitalService: ModalFormHospitalService,
    private fb: FormBuilder
  ) {
    this.registerForm.reset();
  }

  ngOnInit(): void {
    this.emitResetSubs = this.modalFormHospitalService.emitReset
      .pipe(delay(100))
      .subscribe((res) => {
        this.registerForm.reset();
        this.formSubmitted = false;
        this.txtName.nativeElement.focus();
      });
  }

  ngOnDestroy(): void {
    this.emitResetSubs.unsubscribe();
  }

  cerrarModal() {
    this.modalFormHospitalService.cerrarModal();
  }

  crearHospital() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.hospitalService
      .crearHospital(this.registerForm.get('name')!.value)
      .subscribe((res) => {
        Swal.fire(
          'Guardado',
          'Hospital guardado satisfactoriamente',
          'success'
        );
        this.hospitalService.nuevoHospital.emit();
        this.cerrarModal();
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
