import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

const baseUrlAPI = AppSettings.API_ENDPOINT + '/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  
  listar():Observable<any>{
    return this.http.get(baseUrlAPI);
  }

  //Validaciones 
  validaDescripcionRegistra(descripcion: string): Observable<any> {
    console.log('>>> Service >> validaDescripcionRegistra [inicio]' + descripcion);
    return this.http.get<any>(baseUrlAPI + '/validaDescripcionRegistra?descripcion=' + descripcion);
  }
  validaDescripcionActualiza(descripcion: string, id: number): Observable<any> {
    console.log('>>> Service >> validaDescripcionActualiza [inicio]' + descripcion);
    return this.http.get<any>(baseUrlAPI + '/validaDescripcionActualiza?descripcion=' + descripcion + "&idCategoria=" + id);
  }

  //CRUD de Categoria
  registrarCrud(data:Categoria):Observable<any>{
    return this.http.post(baseUrlAPI+"/registraCategoria", data);
  }
  actualizarCrud(data:Categoria):Observable<any>{
    return this.http.put(baseUrlAPI+"/actualizaCategoria", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlAPI+"/eliminaCategoria/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlAPI+"/listaCategoriaPorDescripcionLike/"+ filtro);
  }
}
