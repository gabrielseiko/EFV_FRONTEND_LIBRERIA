import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu.component';
import { Categoria } from '../../../models/categoria.model';
import { Usuario } from '../../../models/usuario.model';
import { CategoriaService } from '../../../services/categoria.service';
import { TokenService } from '../../../security/token.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-categoria-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './categoria-agregar.component.html',
  styleUrl: './categoria-agregar.component.css'
})
export class CategoriaAgregarComponent {
  
  categoria: Categoria = {
    descripcion: "",
  }

  formRegistrar = this.formBuilder.group({
    validaDescripcion: ['', [Validators.required, Validators.minLength(3)], this.validaDescripcion.bind(this)],
  });


  //usuario en sesion
  objUsuario: Usuario = {};

  constructor(private categoriaService: CategoriaService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder) {
    console.log(">>> constructor  >>> ");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit [fin]");
  }

  registra() {
    console.log(">>> registra [inicio]");
    console.log(this.categoria);


    this.categoriaService.registrarCrud(this.categoria).subscribe(
      x => {
        Swal.fire({ icon: 'success', title: 'Resultado del Registro', text: x.mensaje, });
        this.categoria = {
          descripcion: "",
        }
      }
    );
  }

  validaDescripcion(control: FormControl) {
    console.log(">>> validaDescripcion [inicio] " + control.value);

    return this.categoriaService.validaDescripcionRegistra(control.value).pipe(
      map((resp: any) => {
        console.log(">>> validaDescripcion [resp] " + resp.valid);
        return (resp.valid) ? null : { existeDescripcion: true };
      })
    );
  }

  salir() {
    
  }

}
