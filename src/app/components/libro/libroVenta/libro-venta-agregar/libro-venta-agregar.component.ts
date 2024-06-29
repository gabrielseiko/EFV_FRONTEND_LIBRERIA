import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../menu/menu.component';
import { LibroVenta } from '../../../../models/libro-venta.model';
import { Categoria } from '../../../../models/categoria.model';
import { Libro } from '../../../../models/libro.model';
import { Usuario } from '../../../../models/usuario.model';
import { LibroVentaService } from '../../../../services/libro-venta.service';
import { LibroService } from '../../../../services/libro.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { TokenService } from '../../../../security/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro-venta-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './libro-venta-agregar.component.html',
  styleUrl: './libro-venta-agregar.component.css'
})
export class LibroVentaAgregarComponent {
  libroVenta: LibroVenta = {
    precio: 0,
    stock: -1,
    libro: {
      idLibro: -1,
    }
  }

  cat: Categoria = {
    idCategoria: -1,
    descripcion: "",
  }

  formRegistrar = this.formBuilder.group({
    validaPrecio: ['', [Validators.required, Validators.min(1)]],
    validaStock: ['', [Validators.required, Validators.min(1)]],
    validaCategoria: ['', [Validators.min(1)]],
    validaLibro: ['', [Validators.min(1)]],
  });

  //lista de categoria
  lstCategoria: Categoria[] = [];

  //lista de libros x categoria
  lstLibro: Libro[] = []

  //usuario en sesion
  objUsuario: Usuario = {};

  constructor(private libroVentaService: LibroVentaService,
    private libroService: LibroService,
    private categoriaService: CategoriaService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) {
    console.log(">>> constructor  >>> ");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.categoriaService.listar().subscribe(
      x => this.lstCategoria = x
    );
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit >>> 1 >> " + this.lstCategoria);
    console.log(">>> OnInit [fin]");
  }

  registra() {
    console.log(">>> registra [inicio] " + this.libroVenta);
    console.log(this.libroVenta);


    this.libroVentaService.registrarCrud(this.libroVenta).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
        this.libroVenta = {
          precio: 0,
          stock: -1,
          libro: {
            idLibro: -1,
          }
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: ' El libro ya tiene un registro en Libro Venta.',
        });
        console.error('Error al registrar el libro para venta:', error);
      }
    );
  }

  listaLibros() {
    console.log("listaLibros>>> " + this.libroVenta.libro);
    this.libroService.listaLibrosPorCategoria(this.cat.idCategoria).subscribe(
      x => this.lstLibro = x
    );

  }

  salir() {

  }

}
