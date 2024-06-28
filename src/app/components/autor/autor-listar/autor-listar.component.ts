import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../app.material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../../../models/autor.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../../security/token.service';
import { AutorService } from '../../../services/autor.service';
import Swal from 'sweetalert2';
import { AutorAgregarComponent } from '../autor-agregar/autor-agregar.component';
import { AutorActualizarComponent } from '../autor-actualizar/autor-actualizar.component';

@Component({
  selector: 'app-autor-listar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './autor-listar.component.html',
  styleUrls: ['./autor-listar.component.css']
})
export class AutorListarComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Autor>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    "idAutor",
    "nombreCompleto",
    "acciones"
  ]; 

  listaAutores: Autor[] = [];

  constructor(
    private dialogService: MatDialog,
    private autorService: AutorService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openDialogRegistrar() {
    const dialogRef = this.dialogService.open(AutorAgregarComponent, {});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
  }

  openDialogActualizar(obj: Autor) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("obj: ", obj);
    const dialogRef = this.dialogService.open(AutorActualizarComponent, {data: obj} );
    dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && (result === 1 || result === 2)) {
              this.refreshTable();
        }
    });
    console.log(">>> openDialogActualizar [fin]");
  }  

  refreshTable() {
    this.autorService.listarAutores().subscribe(
      data => {
        this.listaAutores = data;
        this.dataSource.data = this.listaAutores;
      },
      error => {
        console.error('Error al listar Autores:', error);
      }
    );
  }

  delete(obj: Autor) {
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
        this.autorService.eliminarAutor(obj.idAutor || 0).subscribe(
          x => {
            Swal.fire('Mensaje', x.mensaje, 'info');
            this.refreshTable();
          },
          error => {
            Swal.fire('Error', 'No se pudo eliminar el Autor', 'error');
          }
        );
      }
    });
  }
}
