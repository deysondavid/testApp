import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sucursal } from 'src/app/models/sucursal';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
})
export class SucursalesComponent implements OnInit {
  // Variable para controlar la visibilidad de la modal de confirmación
  mostrarModalConfirmacion = false;
  idSucursal = 0;
  constructor(public dialog: MatDialog, public srv: SucursalesService,
    private snackBar: MatSnackBar
    ) {}

  displayedColumns = [
    'idSucursal',
    'identificacion',
    'codigo',
    'descripcion',
    'fecha_modificacion',
    'simbolo',
    'actions',
  ];
  dataSource = new MatTableDataSource<Sucursal>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  @ViewChild('filter', { static: true }) filter: ElementRef | undefined;

  ngOnInit() {
    this.getAllSucursal();
  }

  getAllSucursal() {
    this.srv.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Sucursal>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openSucursalDialog(dataToEdit?: Sucursal) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: dataToEdit, // Pasa los datos para editar si se proporcionan
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSucursal();
    });
  }

  abrirModalAgregarDatos() {
    this.openSucursalDialog(); // Para agregar, no se pasa ningún dato de edición
  }

  edit(element: Sucursal) {
    this.openSucursalDialog(element); // Para editar, se pasa el objeto Sucursal
  }

  // Función para abrir la modal de confirmación
  abrirModalConfirmacion(element: any) {   
    this.idSucursal=element.idSucursal;
    this.mostrarModalConfirmacion = true;
  }

  // Función para cerrar la modal de confirmación
  cerrarModalConfirmacion() {
    this.mostrarModalConfirmacion = false;
  }

  // Función para confirmar la eliminación
  confirmarEliminacion() {
    // Llama al servicio para eliminar el elemento
    this.srv.delete(this.idSucursal).subscribe(() => {
      this.snackBar.open('Eliminado con éxito', 'Cerrar', {
        duration: 10000, // Duración en milisegundos (10 segundos en este ejemplo)
      });

      // Cierra la modal de confirmación
      this.cerrarModalConfirmacion();

      // Actualiza la lista después de eliminar
      this.getAllSucursal();
    });
  }
}
