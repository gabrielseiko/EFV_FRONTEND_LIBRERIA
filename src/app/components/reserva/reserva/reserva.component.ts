import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu.component';
import { LibroReserva } from '../../../models/libro-reserva.model';
import { Categoria } from '../../../models/categoria.model';
import { LibroReservaService } from '../../../services/libro-reserva.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TokenService } from '../../../security/token.service';
import { Reserva } from '../../../models/reserva.model';
import { ReservaService } from '../../../services/reserva.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule, MatListModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  reserva:Reserva = {
    libro: {
      idLibroReserva: -1,
    },
    usuario: {
      idUsuario: -1
    }
  };

  libroReserva: LibroReserva = {
    stock: 0,
    libro: {
      idLibro: -1,
    }
  };

  libros: LibroReserva[] = []
  categorias: Categoria[] = []
  cat: Categoria | undefined;
  Titulo: String = "Libros disponibles";
  idCat: number = 0;

  // Usuario en sesión
  objUsuario: Usuario = {};

  constructor(private libroReservaService: LibroReservaService,
    private categoriaService: CategoriaService,
    private reservaService: ReservaService,
    private tokenService: TokenService) {
      this.libroReservaService.listar().subscribe(x => this.libros = x),
      this.categoriaService.listar().subscribe(x => { this.categorias = x });
    
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit >>> 1 >> " + this.libros);
    console.log(">>> OnInit [fin]");
  }

  seleccionarCategoria(categoria: Categoria) {
    this.cat = categoria;
    this.idCat = Number(categoria.idCategoria);
    if (categoria != null) {
      this.Titulo = "Libros de " + categoria.descripcion;
      this.libroReservaService.listaLibrosReservaPorCategoria(this.idCat).subscribe(res => this.libros = res)
    }
    console.log(categoria)
  }

  listarProductos() {
    this.cat = undefined;
    this.libroReservaService.listarDisponibles().subscribe(x => this.libros = x);
    this.Titulo = "Libros disponibles";
  }

  agregarReserva(libro:LibroReserva){
    this.reserva.usuario = { idUsuario: this.tokenService.getUserId() };
    this.reserva.libro = { idLibroReserva: libro.idLibroReserva };
    console.log(libro)
    console.log(libro.idLibroReserva)
    console.log(this.reserva)

    this.reservaService.registrarReserva(this.reserva).subscribe(
      x => {
        Swal.fire({ icon: 'success', title: 'Resultado del Registro', text: x.mensaje, });
        this.reserva = {
          libro: {
            idLibroReserva: -1,
          },
          usuario: {
            idUsuario: -1
          }
        }
      }
    );
  }

}
