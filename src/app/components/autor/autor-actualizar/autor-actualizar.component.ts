import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../app.material.module';
import { Autor } from '../../../models/autor.model';
import { AutorService } from '../../../services/autor.service';
import { TokenService } from '../../../security/token.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './autor-actualizar.component.html',
  styleUrl: './autor-actualizar.component.css'
})
export class AutorActualizarComponent {
  autor: Autor = {
    idAutor: -1,
    nombreCompleto: ""
  }

  formRegistrar = this.formBuilder.group({
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]]
  });  

  constructor(
    private autorService: AutorService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Autor 
  ) {this.autor = data;} 

  actualizar() {
    this.autorService.actualizarAutor(this.autor).subscribe(
      x=>{
            Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
            this.autor ={
              idAutor: -1,
              nombreCompleto: "",
                }
        }
    );
  }
  
  resetForm() {
    this.autor = {
      idAutor: -1,
      nombreCompleto: "",
    };
    this.formRegistrar.reset();
  } 
  salir() {
          
  }  
}
