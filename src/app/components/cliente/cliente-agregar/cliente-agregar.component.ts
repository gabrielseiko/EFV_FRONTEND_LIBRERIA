import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../app.material.module';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { TokenService } from '../../../security/token.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-cliente-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './cliente-agregar.component.html',
  styleUrl: './cliente-agregar.component.css'
})
export class ClienteAgregarComponent {
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
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')], this.validacionNombre.bind(this)],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')], this.validacionApellido.bind(this)],
    validaDni: ['', [Validators.required, Validators.pattern('[0-9]{8}')], this.validacionDni.bind(this)],
    validaTelefono: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    validaEmail: ['', [Validators.required, Validators.email], this.validacionEmail.bind(this)],
    validaFechaNac: ['', [Validators.required]],
    validaSexo: ['', [Validators.required]],
    validaUser: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{3,15}')], this.validacionUser.bind(this)],
    validaContrasenia: ['', [Validators.required]],
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
    this.usuarioService.listarClientes().subscribe(x => this.listaAdmin = x);
    this.objUsuario.idUsuario = this.tokenService.getUserId();
  }
  
  registra() {
    // Asignar el ID del administrador logueado al idRecursivo del nuevo usuario
    this.usuario.idRecursivo = { idUsuario: this.tokenService.getUserId() };

    // Clonar el objeto usuario y formatear la fecha en la copia
    const usuarioParaEnviar = { ...this.usuario };
    usuarioParaEnviar.fechaNac = moment(this.usuario.fechaNac).format('YYYY-MM-DD') as unknown as Date;

    this.usuarioService.registrarCliente(usuarioParaEnviar).subscribe(
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
  validacionNombre(control: FormControl){
    return this.usuarioService.validaNombre(control.value).pipe(
      map((resp: any)=>{
        return (resp.valid) ? null : {existeNombre: true};
      })
    );
  }
  validacionApellido(control: FormControl){
    return this.usuarioService.validaApellido(control.value).pipe(
      map((resp: any)=>{
        return (resp.valid) ? null : {existeApellido: true};
      })
    );
  }
  validacionDni(control: FormControl){
    return this.usuarioService.validaDni(control.value).pipe(
      map((resp: any)=>{
        return (resp.valid) ? null : {existeDni: true};
      })
    );
  }
  validacionEmail(control: FormControl){
    return this.usuarioService.validaEmail(control.value).pipe(
      map((resp: any)=>{
        return (resp.valid) ? null : {existeEmail: true};
      })
    );
  }
  validacionUser(control: FormControl){
    return this.usuarioService.validaUser(control.value).pipe(
      map((resp: any)=>{
        return (resp.valid) ? null : {existeUser: true};
      })
    );
  }
}
