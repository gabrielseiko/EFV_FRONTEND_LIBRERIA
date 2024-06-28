import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const urlUsuario = AppSettings.API_ENDPOINT+ '/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  //LISTADO DE USUARIOS TOTALES(ADMIN, TRABAJADOR, CLIENTES)
  listarUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(urlUsuario);
  }
  //LISTADO DE TRABAJADORES
  listarTrabajadores():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(urlUsuario+"/trabajadores");
  }
  //LISTADO DE TRABAJADORES DE UN ADMINISTRADOR
  listarTrabajadorPorAdmin(param:any):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(urlUsuario+"/listarTrabajador/"+param);
  }
  //LISTADO DE CLIENTES
  listarClientes():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(urlUsuario+"/clientes");
  }

  //CRUD USUARIO**

  //REGISTRAR USUARIO
  registrarUsuario(data:Usuario):Observable<any>{
    return this.http.post(urlUsuario+"/registrarUsuario", data);
  }
  //ACTUALIZAR USUARIO
  actualizarUsuario(data:Usuario):Observable<any>{
    return this.http.put(urlUsuario+"/actualizarUsuario", data);
  }
  //ELIMINAR USUARIO
  eliminarUsuario(id:number):Observable<any>{
    return this.http.delete(urlUsuario+"/eliminarUsuario/"+id);
  }

  //CRUD TRABAJADOR**

  //REGISTRAR TRABAJADOR
  registrarTrabajador(data:Usuario):Observable<any>{
    return this.http.post(urlUsuario+"/registrarTrabajador", data);
  }
  //ACTUALIZAR TRABAJADOR
  actualizarTrabajador(data:Usuario):Observable<any>{
    return this.http.put(urlUsuario+"/actualizarTrabajador", data);
  }


  //CRUD CLIENTE**

  //REGISTRAR CLIENTE
  registrarCliente(data:Usuario):Observable<any>{
    return this.http.post(urlUsuario+"/registrarCliente", data);
  }
}
