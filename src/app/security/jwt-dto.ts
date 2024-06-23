import { Enlace } from "./opcion";

export class JwtDTO {
    token?: string;
    type?: string;
    nombreUsuario?: string;
    authorities?: string[];
    opciones?: Enlace[];
}
