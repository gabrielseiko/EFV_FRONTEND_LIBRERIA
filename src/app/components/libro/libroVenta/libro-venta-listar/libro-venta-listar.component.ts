import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { LibroService } from '../../../../services/libro.service';
import { LibroVentaService } from '../../../../services/libro-venta.service';
import { TokenService } from '../../../../security/token.service';
import { LibroVentaAgregarComponent } from '../libro-venta-agregar/libro-venta-agregar.component';
import { LibroVenta } from '../../../../models/libro-venta.model';
import { LibroVentaActualizarComponent } from '../libro-venta-actualizar/libro-venta-actualizar.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro-venta-listar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './libro-venta-listar.component.html',
  styleUrl: './libro-venta-listar.component.css'
})
export class LibroVentaListarComponent {
  //Datos para la Grila
  dataSource = new MatTableDataSource<LibroVenta>();

  //Clase para la paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idLibroVenta", "titulo", "categoria", "stock", "precio", "estado", "acciones"];

  //filtro de la consulta
  filtro: string = "";

  //Lista de libros reserva
  lstLibros: LibroVenta[] = []; 

  objUsuario: Usuario = {};

  constructor(private dialogService: MatDialog,
    private libroService: LibroService,
    private libroVentaService: LibroVentaService,
    private tokenService: TokenService) {
  }

  ngOnInit() {
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogRegistrar() {
    console.log(">>> openDialogRegistrar [ini]");
    const dialogRef = this.dialogService.open(LibroVentaAgregarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogRegistrar [fin]");
  }

  openDialogActualizar(obj: LibroVenta) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("obj: ", obj);
    const dialogRef = this.dialogService.open(LibroVentaActualizarComponent, { data: obj });
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
    //var msgFiltro = this.filtro == "" ? "todos" : this.filtro;
    this.libroVentaService.listar().subscribe(
      data => {
        this.lstLibros = data;
        this.dataSource.data = this.lstLibros;
      },
      error => {
        console.error('Error al listar Libros:', error);
      }
    );

    console.log(">>> refreshTable [fin]");
  }

  updateEstado(obj: LibroVenta) {
    console.log(">>> updateEstado [ini]");
    console.log("obj: ", obj);
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.libroVentaService.actualizarCrud(obj).subscribe(
      x => {
        this.refreshTable();
      }
    );
    console.log(">>> updateEstado [fin]");
  }

  delete(obj: LibroVenta) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se pueden revertir",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroVentaService.eliminarCrud(obj.idLibroVenta || 0).subscribe(
          x => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'warning');
          }
        );
      }
    })
  }

}
