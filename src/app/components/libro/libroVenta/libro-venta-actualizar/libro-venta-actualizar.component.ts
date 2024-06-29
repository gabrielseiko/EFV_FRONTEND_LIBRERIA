import { Component, Inject } from '@angular/core';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro-venta-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './libro-venta-actualizar.component.html',
  styleUrl: './libro-venta-actualizar.component.css'
})
export class LibroVentaActualizarComponent {
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
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:LibroVenta) {
      this.libroVenta = data;
    console.log(">>> constructor  >>> ");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    if(this.libroVenta.libro?.categoria?.idCategoria != -1){
      this.categoriaService.listar().subscribe(
        x => this.lstCategoria = x
      );
    }
    this.listaLibros();
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit >>> 1 >> " + this.lstCategoria);
    console.log(">>> OnInit [fin]");
  }

  actualiza() {
    console.log(">>> registra [inicio] " + this.libroVenta);
    console.log(this.libroVenta);


    this.libroVentaService.actualizarCrud(this.libroVenta).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
        this.libroVenta = {
          precio: 0,
          stock: -1,
          libro: {
            idLibro: -1,
          }
        }
      }
    );
  }

  listaLibros() {
    console.log("listaLibros>>> " + this.libroVenta.libro);
    if(this.libroVenta.libro?.categoria?.idCategoria === this.libroVenta.libro?.categoria?.idCategoria){
      this.libroService.listaLibrosPorCategoria(this.libroVenta.libro?.categoria?.idCategoria).subscribe(
        (x) =>{
          this.lstLibro = x
          x.forEach(libro => {
            console.log(">>> Libros >>>" + libro.titulo)
          })
        }
      );
    }else{
      console.log(">>> ELSE >>>")
      this.libroVenta.libro!.categoria!.idCategoria = -1;
      this.libroService.listaLibrosPorCategoria(this.libroVenta.libro!.categoria!.idCategoria).subscribe(
        (x) =>{
          this.lstLibro = x
          x.forEach(libro => {
            console.log(">>> Libros >>>" + libro.titulo)
          })
        }
      )
    }
    

  }

  salir() {

  }

}
