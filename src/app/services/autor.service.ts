import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor.model';

const urlAutor = AppSettings.API_ENDPOINT+ '/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http:HttpClient) { }

  //LISTADO DE AUTORES
  listarAutores(): Observable<Autor[]>{
    return this.http.get<Autor[]>(urlAutor);
  }
  //REGISTRAR AUTOR
  registrarAutor(data:Autor): Observable<any>{
    return this.http.post(urlAutor+"/registrarAutor", data);
  }
  //ACTUALIZAR AUTOR
  actualizarAutor(data:Autor): Observable<any>{
    return this.http.put(urlAutor+"/actualizarAutor", data);
  }
  //ELIMINAR AUTOR
  eliminarAutor(id:number):Observable<any>{
    return this.http.delete(urlAutor+"/eliminarAutor/"+id);
  }

  //VALIDACIONES
  validaNombreCompleto(nombreCompleto:string):Observable<any>{
    return this.http.get<any>(urlAutor+'/validaNombreCompleto?nombreCompleto='+ nombreCompleto );
  }
  //CONSULTA
  consultaAutorNombre(filtro:string):Observable<any>{
    return this.http.get(urlAutor+"/listaAutoresPorNombreLike/" + filtro);
  }
}
