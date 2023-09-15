import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sucursal } from '../models/sucursal';
import { Observable } from 'rxjs';

const ELEMENT_DATA: Sucursal[] = [
  { codigo: 1, descripcion: "Centro", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 1 },
  { codigo: 2, descripcion: "La cumbre", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 2 },
  { codigo: 3, descripcion: "Cabecera", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 3 },
  { codigo: 4, descripcion: "Canelos", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 4 },
  { codigo: 5, descripcion: "Sotomayor", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 15 },
  { codigo: 6, descripcion: "Florida", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 16 },
  { codigo: 7, descripcion: "giron", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 17 },
  { codigo: 8, descripcion: "Mutis", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 18 },
  { codigo: 9, descripcion: "Palomitas", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 19 },
  { codigo: 10, descripcion: "Provenza", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 10 },
  { codigo: 11, descripcion: "Villabel", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 12 },
  { codigo: 12, descripcion: "La invacion", direccion: "calle123", fecha_creacion: "14/05/2023", idmodena: 1, idsucursal: 11 },

];

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  private readonly API_URL = '';

  constructor(private httpClient: HttpClient) { }

  getAll():Sucursal[] {
    //return this.httpClient.get<Sucursal[]>(this.API_URL)
    return ELEMENT_DATA 
  }

  create(suc: Sucursal): Observable<any> {
    return this.httpClient.post(this.API_URL, suc)
  }

  modify(suc: Sucursal): Observable<any> {
    return this.httpClient.put(this.API_URL, suc)
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL)
  }
}
