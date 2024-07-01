import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { AutorListarComponent } from './components/autor/autor-listar/autor-listar.component';
import { CategoriaListarComponent } from './components/categoria/categoria-listar/categoria-listar.component';
import { LibroListarComponent } from './components/libro/libro/libro-listar/libro-listar.component';
import { LibroReservaListarComponent } from './components/libro/libroReserva/libro-reserva-listar/libro-reserva-listar.component';
import { LibroVentaListarComponent } from './components/libro/libroVenta/libro-venta-listar/libro-venta-listar.component';
import { ComentarioListarComponent } from './components/comentario/comentario-listar/comentario-listar.component';
import { ClienteListarComponent } from './components/cliente/cliente-listar/cliente-listar.component';
import { TrabajadorListarComponent } from './components/trabajador/trabajador-listar/trabajador-listar.component';
import { ReservaComponent } from './components/reserva/reserva/reserva.component';
import { VentaComponent } from './components/venta/venta/venta.component';
import { ReporteReservaComponent } from './components/reporte/reporte-reserva/reporte-reserva.component';
import { ReporteVentaComponent } from './components/reporte/reporte-venta/reporte-venta.component';
import { ConsultaReservaComponent } from './components/reserva/consulta/consulta-reserva/consulta-reserva.component';

export const routes: Routes = [
    { path: 'verCrudAutor', component: AutorListarComponent },
    { path: 'verCrudCategoria', component:CategoriaListarComponent},
    { path: 'verCrudLibro', component:LibroListarComponent},
    { path: 'verCrudLibroReserva', component:LibroReservaListarComponent},
    { path: 'verCrudLibroVenta', component:LibroVentaListarComponent},
    { path: 'verCrudComentario', component:ComentarioListarComponent},
    { path: 'verCrudCliente', component:ClienteListarComponent},
    { path: 'verCrudTrabajador', component:TrabajadorListarComponent},
    { path: 'verReporteReservas', component:ReporteReservaComponent},
    { path: 'verReporteVentas', component:ReporteVentaComponent},
    { path: 'verReserva', component:ReservaComponent},
    { path: 'verVenta', component:VentaComponent},
    { path: 'verReservaCliente', component:ConsultaReservaComponent},

    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
