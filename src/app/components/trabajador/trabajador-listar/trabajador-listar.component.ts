import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { TokenService } from '../../../security/token.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TrabajadorAgregarComponent } from '../../trabajador/trabajador-agregar/trabajador-agregar.component';
import { AppMaterialModule } from '../../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu.component';
import { TrabajadorActualizarComponent } from '../trabajador-actualizar/trabajador-actualizar.component';

@Component({
  selector: 'app-trabajador-listar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './trabajador-listar.component.html',
  styleUrls: ['./trabajador-listar.component.css']
})
export class TrabajadorListarComponent implements OnInit {

  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  listaTrabajadores: Usuario[] = [];
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

  openDialogRegistrar() {
    const dialogRef = this.dialogService.open(TrabajadorAgregarComponent, {
      width: '5000px', // Ajusta el ancho según tus necesidades
      height: 'auto', // Ajusta la altura según tus necesidades
      autoFocus: false
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
    const dialogRef = this.dialogService.open(TrabajadorActualizarComponent, {data: obj} );
    dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && (result === 1 || result === 2)) {
              this.refreshTable();
        }
    });
    console.log(">>> openDialogActualizar [fin]");
  }  
  
  refreshTable() {
    this.usuarioService.listarTrabajadores().subscribe(
      data => {
        this.listaTrabajadores = data;
        this.dataSource.data = this.listaTrabajadores;
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