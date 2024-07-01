import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';

const baseUrlAPI = AppSettings.API_ENDPOINT + '/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  listar():Observable<any>{
    return this.http.get(baseUrlAPI);
  }

  //lista reserva por cliente
  listaReservasCliente(cliente: any):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(baseUrlAPI + '/listaReservasPorCliente/' + cliente);
  }

  //CRUD de Reserva
  registrarReserva(data:Reserva):Observable<any>{
    return this.http.post(baseUrlAPI+"/registrarReserva", data);
  }
  actualizarReserva(data:Reserva):Observable<any>{
    return this.http.put(baseUrlAPI+"/actualizarReserva", data);
  }
  eliminarReserva(id:number):Observable<any>{
    return this.http.delete(baseUrlAPI+"/eliminarReserva/"+id);
  }


}
