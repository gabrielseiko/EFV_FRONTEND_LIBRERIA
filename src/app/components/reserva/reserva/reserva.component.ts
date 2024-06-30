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

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  libros: LibroReserva[] = []
  categorias: Categoria[] = []
  cat: Categoria | undefined;
  Titulo: String = "Libros disponibles";
  idCat: number = 0;

  constructor(private libroReservaService: LibroReservaService,
    private categoriaService: CategoriaService,
    private tokenService: TokenService) {
    this.libroReservaService.listar().subscribe(x => this.libros = x),
      this.categoriaService.listar().subscribe(x => { this.categorias = x });
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
    this.libroReservaService.listar().subscribe(x => this.libros = x);
    this.Titulo = "Libros disponibles";
  }

}
