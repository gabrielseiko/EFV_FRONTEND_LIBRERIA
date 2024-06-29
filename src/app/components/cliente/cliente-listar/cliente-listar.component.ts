import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../app.material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { TokenService } from '../../../security/token.service';
import { ClienteAgregarComponent } from '../cliente-agregar/cliente-agregar.component';
import { ClienteActualizarComponent } from '../cliente-actualizar/cliente-actualizar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-listar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './cliente-listar.component.html',
  styleUrl: './cliente-listar.component.css'
})
export class ClienteListarComponent implements OnInit{

  //Datos para la Grila
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  displayedColumns = [
    "idUsuario",
    "nombres",
    "apellidos",
    "dni",
    "telefono",
    "email",
    "fechaNac", 
    "sexo",
    "user",
    "idRecursivo",
    "acciones"
  ]; 
  //filtro de la consulta
  filtro: string = "";

  listaClientes: Usuario[] = [];
  objUsuario: Usuario = {};

  constructor(
    private dialogService: MatDialog,
    private usuarioService: UsuarioService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogRegistrar() {
    const dialogRef = this.dialogService.open(ClienteAgregarComponent, {
      width: '90%',
      height: 'auto',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
  }  
  openDialogActualizar(obj: Usuario) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("obj: ", obj);
    const dialogRef = this.dialogService.open(ClienteActualizarComponent, {data: obj} );
    dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && (result === 1 || result === 2)) {
              this.refreshTable();
        }
    });
    console.log(">>> openDialogActualizar [fin]");
  }  

  refreshTable() {
    var msgFiltro = this.filtro == "" ? "todos" : this.filtro;
    this.usuarioService.consultaClienteNombre(msgFiltro).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Usuario>(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Error al listar trabajadores:', error);
      }
    );
  }

  delete(obj: Usuario) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(obj.idUsuario || 0).subscribe(
          x => {
            Swal.fire('Mensaje', x.mensaje, 'info');
            this.refreshTable();
          },
          error => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        );
      }
    });
  }
}
