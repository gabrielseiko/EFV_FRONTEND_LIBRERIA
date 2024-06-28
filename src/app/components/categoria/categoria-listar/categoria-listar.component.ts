import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from '../../../services/categoria.service';
import { TokenService } from '../../../security/token.service';
import { CategoriaAgregarComponent } from '../categoria-agregar/categoria-agregar.component';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaActualizarComponent } from '../categoria-actualizar/categoria-actualizar.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-listar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './categoria-listar.component.html',
  styleUrl: './categoria-listar.component.css'
})
export class CategoriaListarComponent {
  //Datos para la Grila
  dataSource: any;

  //Clase para la paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idCategoria", "descripcion", "acciones"];

  //filtro de la consulta
  filtro: string = "";

  objUsuario: Usuario = {};

  constructor(private dialogService: MatDialog,
    private categoriaService: CategoriaService,
    private tokenService: TokenService) {
    //this.objUsuario.idUsuario = tokenService.getUserId();
  }

  openDialogRegistrar() {
    console.log(">>> openDialogRegistrar [ini]");
    const dialogRef = this.dialogService.open(CategoriaAgregarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogRegistrar [fin]");
  }

  openDialogActualizar(obj: Categoria) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("obj: ", obj);
    const dialogRef = this.dialogService.open(CategoriaActualizarComponent, { data: obj });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && (result === 1 || result === 2)) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogActualizar [fin]");
  }

  refreshTable() {
    console.log(">>> refreshTable [ini]");
    var msgFiltro = this.filtro == "" ? "todos" : this.filtro;
    this.categoriaService.consultarCrud(msgFiltro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Categoria>(x);
        this.dataSource.paginator = this.paginator
      }
    );

    console.log(">>> refreshTable [fin]");
  }

  delete(obj: Categoria) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se pueden revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCrud(obj.idCategoria || 0).subscribe(
          x => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        );
      }
    })
  }

}
