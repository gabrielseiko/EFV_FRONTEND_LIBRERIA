import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibroReserva } from '../models/libro-reserva.model';

const baseUrlAPI = AppSettings.API_ENDPOINT + '/libro';
@Injectable({
  providedIn: 'root'
})
export class LibroReservaService {

  constructor(private http: HttpClient) { }
  
  listar():Observable<any>{
    return this.http.get(baseUrlAPI+"/reserva");
  }

  //CRUD de LibroReserva
  registrarCrud(data:LibroReserva):Observable<any>{
    return this.http.post(baseUrlAPI+"/registraLibroReserva", data);
  }
  actualizarCrud(data:LibroReserva):Observable<any>{
    return this.http.put(baseUrlAPI+"/actualizaLibroReserva", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlAPI+"/eliminaLibroReserva/"+id);
  }
}
