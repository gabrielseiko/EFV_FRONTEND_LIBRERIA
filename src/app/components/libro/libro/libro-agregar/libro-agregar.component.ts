import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../../app.material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../menu/menu.component';
import { Libro } from '../../../../models/libro.model';
import { Usuario } from '../../../../models/usuario.model';
import { LibroService } from '../../../../services/libro.service';
import { TokenService } from '../../../../security/token.service';
import { Categoria } from '../../../../models/categoria.model';
import { CategoriaService } from '../../../../services/categoria.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-libro-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './libro-agregar.component.html',
  styleUrl: './libro-agregar.component.css'
})
export class LibroAgregarComponent {
  libro: Libro = {
    titulo: "",
    descripcion: "",
    publicacion: new Date(""),
    imagen: "",
    categoria: {
      idCategoria: -1,
    }
  }

  formRegistrar = this.formBuilder.group({
    validaTitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)], this.validaTitulo.bind(this)],
    validaDescripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    validaPublicacion: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    validaImagen: ['', [Validators.required, Validators.pattern('https?://.+')]],
    validaCategoria: ['', [Validators.min(1)]],
  });

  //lista de categoria
  lstCategoria: Categoria[] = [];

  //usuario en sesion
  objUsuario: Usuario = {};

  constructor(private libroService: LibroService,
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
    console.log(">>> registra [inicio] " + this.libro);
    console.log(this.libro);


    this.libroService.registrarCrud(this.libro).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
        this.libro = {
          titulo: "",
          descripcion: "",
          publicacion: new Date(""),
          imagen: "",
          categoria: {
            idCategoria: -1,
          }
        }
      }
    );
  }

  validaTitulo(control: FormControl) {
    console.log(">>> validaTitulo [inicio] " + control.value);

    return this.libroService.validaTituloRegistra(control.value).pipe(
      map((resp: any) => {
        console.log(">>> validaTitulo [resp] " + resp.valid);
        return (resp.valid) ? null : { existeTitulo: true };
      })
    );
  }

  salir() {
    
  }

}
