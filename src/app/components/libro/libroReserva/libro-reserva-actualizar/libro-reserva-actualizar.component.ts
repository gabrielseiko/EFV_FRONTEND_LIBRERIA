import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../menu/menu.component';
import { LibroReserva } from '../../../../models/libro-reserva.model';
import { Categoria } from '../../../../models/categoria.model';
import { Libro } from '../../../../models/libro.model';
import { Usuario } from '../../../../models/usuario.model';
import { LibroReservaService } from '../../../../services/libro-reserva.service';
import { LibroService } from '../../../../services/libro.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { TokenService } from '../../../../security/token.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-libro-reserva-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './libro-reserva-actualizar.component.html',
  styleUrl: './libro-reserva-actualizar.component.css'
})
export class LibroReservaActualizarComponent {
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
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:LibroReserva) {
      this.libroReserva = data;
    console.log(">>> constructor  >>> ");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    if(this.libroReserva.libro?.categoria?.idCategoria != -1){
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
    console.log(">>> registra [inicio] " + this.libroReserva);
    console.log(this.libroReserva);


    this.libroReservaService.actualizarCrud(this.libroReserva).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
        this.libroReserva = {
          stock: -1,
          libro: {
            idLibro: -1,
          }
        }
      }
    );
  }

  listaLibros() {
    console.log("listaLibros>>> " + this.libroReserva.libro);
    if(this.libroReserva.libro?.categoria?.idCategoria === this.libroReserva.libro?.categoria?.idCategoria){
      this.libroService.listaLibrosPorCategoria(this.libroReserva.libro?.categoria?.idCategoria).subscribe(
        (x) =>{
          this.lstLibro = x
          x.forEach(libro => {
            console.log(">>> Libros >>>" + libro.titulo)
          })
        }
      );
    }else{
      console.log(">>> ELSE >>>")
      this.libroReserva.libro!.categoria!.idCategoria = -1;
      this.libroService.listaLibrosPorCategoria(this.libroReserva.libro!.categoria!.idCategoria).subscribe(
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
