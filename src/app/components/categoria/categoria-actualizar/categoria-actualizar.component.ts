import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu.component';
import { Categoria } from '../../../models/categoria.model';
import { Usuario } from '../../../models/usuario.model';
import { CategoriaService } from '../../../services/categoria.service';
import { TokenService } from '../../../security/token.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-categoria-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './categoria-actualizar.component.html',
  styleUrl: './categoria-actualizar.component.css'
})
export class CategoriaActualizarComponent {
  categoria: Categoria = {
    descripcion: "",
  }

  formRegistrar = this.formBuilder.group({
    validaDescripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,45}')], this.validaDescripcion.bind(this)],
  });


  //usuario en sesion
  objUsuario: Usuario = {};

  constructor(private categoriaService: CategoriaService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data:Categoria) {
                this.categoria = data;
    console.log(">>> constructor  >>> ");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit [fin]");
  }

  actualiza() {
    console.log(">>> actualiza [inicio]");
    console.log(this.categoria);


    this.categoriaService.actualizarCrud(this.categoria).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
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
