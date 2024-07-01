import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu.component';
import { LibroVenta } from '../../../models/libro-venta.model';
import { Categoria } from '../../../models/categoria.model';
import { LibroVentaService } from '../../../services/libro-venta.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TokenService } from '../../../security/token.service';
import { LibroService } from '../../../services/libro.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule,MatListModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
  libros : LibroVenta[] = []
  categorias : Categoria[] = []
  cat:Categoria|undefined;
  Titulo:String = "Libros disponibles";
  idCat: number = 0;

  constructor(private libroVentaService: LibroVentaService,
              private categoriaService: CategoriaService,
              private tokenService: TokenService) {
    this.libroVentaService.listar().subscribe(x => this.libros = x),
    this.categoriaService.listar().subscribe(x => {this.categorias = x});
  }

  seleccionarCategoria(categoria:Categoria){
    this.cat = categoria;
    this.idCat = Number(categoria.idCategoria);
    if(categoria != null){
      this.Titulo = "Libros de "+ categoria.descripcion;
      this.libroVentaService.listaLibrosVentaPorCategoria(this.idCat).subscribe(res=>this.libros=res)
    }
    console.log(categoria)
  }

  listarProductos(){
    this.cat = undefined;
    this.libroVentaService.listarDisponibles().subscribe(x => this.libros = x);
    this.Titulo = "Libros disponibles";
  }

}
