import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';

const baseUrlAPI = AppSettings.API_ENDPOINT + '/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) { }
  
  listar():Observable<any>{
    return this.http.get(baseUrlAPI);
  }

  //Validaciones 
  validaDescripcionRegistra(titulo: string): Observable<any> {
    console.log('>>> Service >> validaTituloRegistra [inicio]' + titulo);
    return this.http.get<any>(baseUrlAPI + '/validaTituloRegistra?titulo=' + titulo);
  }
  validaDescripcionActualiza(titulo: string, id: number): Observable<any> {
    console.log('>>> Service >> validaTituloActualiza [inicio]' + titulo);
    return this.http.get<any>(baseUrlAPI + '/validaTituloActualiza?descripcion=' + titulo + "&idLibro=" + id);
  }

  //CRUD de Libro
  registrarCrud(data:Libro):Observable<any>{
    return this.http.post(baseUrlAPI+"/registraLibro", data);
  }
  actualizarCrud(data:Libro):Observable<any>{
    return this.http.put(baseUrlAPI+"/actualizaLibro", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlAPI+"/eliminaLibro/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlAPI+"/listaLibroPorTituloLike/"+ filtro);
  }
}
