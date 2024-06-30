import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibroVenta } from '../models/libro-venta.model';

const baseUrlAPI = AppSettings.API_ENDPOINT + '/libro';
@Injectable({
  providedIn: 'root'
})
export class LibroVentaService {

  constructor(private http: HttpClient) { }
  
  listar():Observable<any>{
    return this.http.get(baseUrlAPI+"/venta");
  }

  //lista libros por categoria
  listaLibrosVentaPorCategoria(categoria: any):Observable<LibroVenta[]>{
    return this.http.get<LibroVenta[]>(baseUrlAPI + '/listaLibroVentaPorCategoria/' + categoria);
  }

  //CRUD de LibroVenta
  registrarCrud(data:LibroVenta):Observable<any>{
    return this.http.post(baseUrlAPI+"/registraLibroVenta", data);
  }
  actualizarCrud(data:LibroVenta):Observable<any>{
    return this.http.put(baseUrlAPI+"/actualizaLibroVenta", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlAPI+"/eliminaLibroVenta/"+id);
  }
}
