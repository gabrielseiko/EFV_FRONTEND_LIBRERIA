import { Categoria } from "./categoria.model";

export class Libro {
    idLibro?: number;
    titulo?: string;
    descripcion?: string;
    publicacion?:  Date;
    imagen?: string;
    categoria?: Categoria;
}
