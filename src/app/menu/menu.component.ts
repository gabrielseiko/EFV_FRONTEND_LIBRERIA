import { Component, OnInit } from '@angular/core';
import { Opcion } from '../security/opcion';
import { TokenService } from '../security/token.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AppMaterialModule, FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  opcRegistro : Opcion[] = [];
  opcConsulta : Opcion[] = [];
  opcCRUD : Opcion[] = [];
  opcTransacciones : Opcion[] = [];

  constructor(private tokenService: TokenService) {
    console.log("MenuComponent >>> constructor >>> " + this.tokenService.getToken());
  }

  ngOnInit() {
    console.log("MenuComponent >>> ngOnInit >>> ");

    this.opcRegistro = this.tokenService.getOpciones().filter( x => x.tipo === 1);
    this.opcConsulta = this.tokenService.getOpciones().filter( x => x.tipo === 2);
    this.opcCRUD = this.tokenService.getOpciones().filter( x => x.tipo === 3);
    this.opcTransacciones = this.tokenService.getOpciones().filter( x => x.tipo === 4);

    console.log("MenuComponent >>> ngOnInit >>> " + this.tokenService.getToken());
    if (this.tokenService.getToken()) {
      console.log("MenuComponent >>> this.isLogged = true >>> ");
      this.isLogged = true;
    } else {
      console.log("MenuComponent >>> this.isLogged = false >>> ");
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
