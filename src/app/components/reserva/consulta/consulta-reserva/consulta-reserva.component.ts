import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../menu/menu.component';
import { MatTableDataSource } from '@angular/material/table';
import { Reserva } from '../../../../models/reserva.model';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../../../security/token.service';
import { LibroReservaService } from '../../../../services/libro-reserva.service';
import { ReservaService } from '../../../../services/reserva.service';

@Component({
  selector: 'app-consulta-reserva',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-reserva.component.html',
  styleUrl: './consulta-reserva.component.css'
})
export class ConsultaReservaComponent {
  //Datos para la Grila
  dataSource = new MatTableDataSource<Reserva>();

  //Clase para la paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idPrestamo", "libro", "fechaReserva", "fechaDevolucion", "estado"];

  //filtro de la consulta
  filtro: string = "";

  //Lista de libros reserva
  lstReserva: Reserva[] = []; 

  objUsuario: Usuario = {};

  constructor(private dialogService: MatDialog,
    private reservaService: ReservaService,
    private tokenService: TokenService) {
  }

  ngOnInit() {
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  refreshTable() {
    console.log(">>> refreshTable [ini]");
    this.reservaService.listaReservasCliente(this.tokenService.getUserId()).subscribe(
      data => {
        this.lstReserva = data;
        this.dataSource.data = this.lstReserva;
      },
      error => {
        console.error('Error al listar Libros:', error);
      }
    );
  
    console.log(">>> refreshTable [fin]");
  }


}
