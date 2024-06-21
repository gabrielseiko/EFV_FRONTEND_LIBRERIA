import { Opcion } from "./opcion";

export class JwtDTO {
    token?: string;
    type?: string;
    nombreUsuario?: string;
    authorities?: string[];
    opciones?: Opcion[];
}
