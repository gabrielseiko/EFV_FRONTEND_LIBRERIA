import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../app.material.module';
import { Autor } from '../../../models/autor.model';
import { AutorService } from '../../../services/autor.service';
import { TokenService } from '../../../security/token.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './autor-agregar.component.html',
  styleUrl: './autor-agregar.component.css'
})
export class AutorAgregarComponent {
 
  autor: Autor = {
    idAutor: -1,
    nombreCompleto: "",
  }; 

  formRegistrar = this.formBuilder.group({
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]]
  });  

  constructor(
    private autorService: AutorService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {} 
  registra() {
    this.autorService.registrarAutor(this.autor).subscribe(
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
}
