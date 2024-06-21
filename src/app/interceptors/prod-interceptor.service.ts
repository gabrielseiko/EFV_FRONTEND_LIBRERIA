import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../security/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(">> ProdInterceptorService >> intercept >>> " + req)
    let request = req;
    const token = this.tokenService.getToken();
    console.log(">> ProdInterceptorService >>> token  >>> ")
    if (token != null) {
      console.log(token)
      request = req.clone({ headers: req.headers
                                .set('Authorization', 'Bearer ' + token)
                              });
    
      console.log(">> ProdInterceptorService >>> intReq >>> ")
      console.log(request)
    }

    return next.handle(request);
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}];
