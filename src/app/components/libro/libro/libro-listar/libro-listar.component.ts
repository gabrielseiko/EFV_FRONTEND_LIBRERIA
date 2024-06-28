import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { LibroService } from '../../../../services/libro.service';
import { TokenService } from '../../../../security/token.service';
import { LibroAgregarComponent } from '../libro-agregar/libro-agregar.component';
import { Libro } from '../../../../models/libro.model';
import { LibroActualizarComponent } from '../libro-actualizar/libro-actualizar.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro-listar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './libro-listar.component.html',
  styleUrl: './libro-listar.component.css'
})
export class LibroListarComponent {
  //Datos para la Grila
  dataSource: any;

  //Clase para la paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idLibro", "titulo", "publicacion", "imagen", "categoria", "acciones"];

  //filtro de la consulta
  filtro: string = "";

  objUsuario: Usuario = {};

  constructor(private dialogService: MatDialog,
    private libroService: LibroService,
    private tokenService: TokenService) {
  }

  ngOnInit() {
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    this.refreshTable();
  }

  openDialogRegistrar() {
    console.log(">>> openDialogRegistrar [ini]");
    const dialogRef = this.dialogService.open(LibroAgregarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogRegistrar [fin]");
  }

  openDialogActualizar(obj: Libro) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("obj: ", obj);
    const dialogRef = this.dialogService.open(LibroActualizarComponent, { data: obj });
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
    this.libroService.consultarCrud(msgFiltro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Libro>(x);
        this.dataSource.paginator = this.paginator
      }
    );

    console.log(">>> refreshTable [fin]");
  }

  delete(obj: Libro) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se pueden revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.eliminarCrud(obj.idLibro || 0).subscribe(
          x => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        );
      }
    })
  }


}
