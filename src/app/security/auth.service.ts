import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { LoginUsuario } from './login-usuario';
import { Observable } from 'rxjs';
import { JwtDTO } from './jwt-dto';

const authURL = AppSettings.API_ENDPOINT+ '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private HttpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
    return this.HttpClient.post<JwtDTO>(authURL + '/login', loginUsuario);
  }
}
