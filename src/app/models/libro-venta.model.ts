import { Libro } from "./libro.model";

export class LibroVenta {
    idLibroVenta?: number;
    precio?: number;
    stock?: number;
    estado?: number;
    libro?: Libro;
}
