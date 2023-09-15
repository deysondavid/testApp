import { Component, Inject } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Moneda } from 'src/app/models/moneda';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  sucursalForm: FormGroup;
  monedas: Moneda[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public srv: SucursalesService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sucursalForm = this.formBuilder.group({
      IdSucursal: [null],
      Direccion: [null, [Validators.required, Validators.maxLength(255)]],
      Identificacion: [null, [Validators.required, Validators.maxLength(50)]],
      FechaCreacion: [
        null,
        [Validators.required, this.fechaActualMinValidator],
      ],
      Codigo:[null, [Validators.required, Validators.min(1)]],
      Descripcion: [null, [Validators.required, Validators.maxLength(255)]],
      idMoneda: [null, Validators.required],
    });
  }
  ngOnInit() {
    if (this.data) {
      const idMoneda = this.data.idMoneda;
      this.sucursalForm.patchValue({
        IdSucursal: this.data.idSucursal,
        Direccion: this.data.direccion,
        Identificacion: this.data.identificacion,
        FechaCreacion: new Date(this.data.fechaCreacion),
        Codigo: this.data.codigo,
        Descripcion: this.data.descripcion,
        idMoneda: idMoneda,
      });
    }
    this.obtenerMonedas();
  }

  fechaActualMinValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value) {
      const fechaSeleccionada = new Date(control.value);
      const fechaActual = new Date();

      if (fechaSeleccionada < fechaActual) {
        return { fechaActualMin: true };
      }
    }

    return null;
  }
  obtenerMonedas() {
    this.srv.obtenerMonedas().subscribe((data) => {  
      this.monedas = data;
    });
  }
  agregarDatos() {  
    if (this.sucursalForm.valid) {
      const datosSucursal = { ...this.sucursalForm.value }; // Clona el objeto del formulario
      if (datosSucursal.IdSucursal != null) {
        this.srv.modify(datosSucursal).subscribe(
          (respuesta) => {
            // Maneja la respuesta del servicio si es necesario       
            this.sucursalForm.reset();

            // Muestra la tostada de "Guardado con éxito"
            this.snackBar.open('Actualizado con éxito', 'Cerrar', {
              duration: 10000, // Duración en milisegundos (10 segundos en este ejemplo)
            });
            this.dialogRef.close();
          },
          (error) => {
            // Maneja errores si ocurren al guardar
            console.error('Error al Editar sucursal', error);
          }
        );   
      } else {    
        this.srv.create(datosSucursal).subscribe(
          (respuesta) => {
            // Maneja la respuesta del servicio si es necesario   
            this.sucursalForm.reset();

            // Muestra la tostada de "Guardado con éxito"
            this.snackBar.open('Guardado con éxito', 'Cerrar', {
              duration: 10000, // Duración en milisegundos (10 segundos en este ejemplo)
            });
            this.dialogRef.close();
          },
          (error) => {
            // Maneja errores si ocurren al guardar
            console.error('Error al guardar sucursal', error);
          }
        );
      }

      // Llama al servicio de guardar
    } else {
      // Realiza alguna acción o muestra un mensaje de error si el formulario no es válido
      console.error('El formulario no es válido. Verifica los campos.');
    }
  }
}
