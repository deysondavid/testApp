import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sucursal } from 'src/app/models/sucursal';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public srv: SucursalesService) { }

  displayedColumns = ['idsucursal', 'codigo', 'descripcion', 'fecha_modificacion', 'actions'];
  dataSource = new MatTableDataSource<Sucursal>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  @ViewChild('filter', { static: true }) filter: ElementRef | undefined;

  ngOnInit() {
    const data = this.srv.getAll()
    console.log(data)
    this.dataSource = new MatTableDataSource<Sucursal>(data);
    this.dataSource.paginator = this.paginator;

  }

  edit() {
    console.log('edit')
  }

  deleteItem() {
    console.log('delete')
  }


}



