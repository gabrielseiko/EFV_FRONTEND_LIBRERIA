import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../../../menu/menu.component';
import { AppMaterialModule } from '../../../../app.material.module';
import { LibroReserva } from '../../../../models/libro-reserva.model';
import { Categoria } from '../../../../models/categoria.model';
import { Usuario } from '../../../../models/usuario.model';
import { LibroService } from '../../../../services/libro.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { TokenService } from '../../../../security/token.service';
import { LibroReservaService } from '../../../../services/libro-reserva.service';
import { Libro } from '../../../../models/libro.model';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-libro-reserva-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './libro-reserva-agregar.component.html',
  styleUrl: './libro-reserva-agregar.component.css'
})
export class LibroReservaAgregarComponent {
  libroReserva: LibroReserva = {
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
    validaStock: ['', [Validators.required, Validators.max(3)]],
    validaCategoria: ['', [Validators.min(1)]],
    validaLibro: ['', [Validators.min(1)]],
  });

  //lista de categoria
  lstCategoria: Categoria[] = [];

  //lista de libros x categoria
  lstLibro: Libro[] = []

  //usuario en sesion
  objUsuario: Usuario = {};

  constructor(private libroReservaService: LibroReservaService,
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
    console.log(">>> registra [inicio] " + this.libroReserva);
    console.log(this.libroReserva);


    this.libroReservaService.registrarCrud(this.libroReserva).subscribe(
      x => {
        Swal.fire({ icon: 'success', title: 'Resultado del Registro', text: x.mensaje, });
        this.libroReserva = {
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
          text: ' El libro ya tiene un registro en Libro Reserva.',
        });
        console.error('Error al registrar el libro para reserva:', error);
      }
    );
  }

  listaLibros() {
    console.log("listaLibros>>> " + this.libroReserva.libro);
    this.libroService.listaLibrosPorCategoria(this.cat.idCategoria).subscribe(
      x => this.lstLibro = x
    );

  }

  salir() {

  }

}
