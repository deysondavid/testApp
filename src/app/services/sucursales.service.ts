import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sucursal } from '../models/sucursal';
import { Observable } from 'rxjs';
import { Moneda } from '../models/moneda';


@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  private readonly API_URL = 'http://localhost:5149/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<Sucursal[]>(this.API_URL+ 'sucursal/lista')
  }

  create(suc: Sucursal): Observable<any> {
    return this.httpClient.post(this.API_URL+'sucursal/guardar', suc)
  }

  modify(suc: Sucursal): Observable<any> {
    return this.httpClient.put(this.API_URL+'sucursal/editar/'+suc.IdSucursal, suc)
  }

  delete(idSucursal: number) {
    return this.httpClient.delete(this.API_URL+'sucursal/eliminar/'+idSucursal)
  }

  obtenerMonedas(): Observable<any> {
    return this.httpClient.get<Moneda[]>(this.API_URL+ 'moneda/lista')
  }

}
