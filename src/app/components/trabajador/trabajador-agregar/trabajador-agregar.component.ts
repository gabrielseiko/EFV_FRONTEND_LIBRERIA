import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MenuComponent } from '../../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../app.material.module';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { TokenService } from '../../../security/token.service';
import Swal from 'sweetalert2';
import moment from 'moment';

@Component({
  selector: 'app-trabajador-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './trabajador-agregar.component.html',
  styleUrl: './trabajador-agregar.component.css'
})
export class TrabajadorAgregarComponent {
  
  usuario: Usuario = {
    nombres: "",
    apellidos: "",
    dni: "",
    telefono: "",
    email: "",
    fechaNac: new Date(),  
    sexo: "",
    user: "",
    contrasenia: "",
    idRecursivo: {idUsuario: -1}
  }; 

  formRegistrar = this.formBuilder.group({
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]],
    validaDni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    validaTelefono: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    validaEmail: ['', [Validators.required, Validators.email]],
    validaFechaNac: ['', [Validators.required]],
    validaSexo: ['', [Validators.required]],
    validaUser: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{5,15}')]],
    validaContrasenia: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{5,15}')]],
    validaIdRecursivo: ['', [Validators.required]]
  });  

  // Lista de Admin
  listaAdmin: Usuario[] = [];
  // Usuario en sesión
  objUsuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {} 

  ngOnInit() {
    this.usuario.fechaNac = new Date();
    this.usuarioService.listarTrabajadores().subscribe(x => this.listaAdmin = x);
    this.objUsuario.idUsuario = this.tokenService.getUserId();
  }

  registra() {
    // Asignar el ID del administrador logueado al idRecursivo del nuevo usuario
    this.usuario.idRecursivo = { idUsuario: this.tokenService.getUserId() };

    // Clonar el objeto usuario y formatear la fecha en la copia
    const usuarioParaEnviar = { ...this.usuario };
    usuarioParaEnviar.fechaNac = moment(this.usuario.fechaNac).format('YYYY-MM-DD') as unknown as Date;

    this.usuarioService.registrarTrabajador(usuarioParaEnviar).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje });
        this.resetForm(); // Limpia el formulario después de registrar
      },
      error => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar el usuario' });
      }
    );
  }
  
  resetForm() {
    this.usuario = {
      nombres: "",
      apellidos: "",
      dni: "",
      telefono: "",
      email: "",
      fechaNac: new Date(),
      sexo: "",
      user: "",
      contrasenia: "",
      idRecursivo: {idUsuario: -1}
    };
    this.formRegistrar.reset();
  }  

}
