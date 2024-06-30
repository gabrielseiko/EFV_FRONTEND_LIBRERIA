import { LibroReserva } from "./libro-reserva.model";
import { Usuario } from "./usuario.model";

export class Reserva {
    idPrestamo?: number;
    libro?: LibroReserva;
    usuario?: Usuario;
    estado?: number;
}
