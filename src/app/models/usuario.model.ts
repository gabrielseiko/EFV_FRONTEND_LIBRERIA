export class Usuario {

    idUsuario?: number;
    nombres?: string;
    apellidos?: string;
    dni?: string;
    telefono?: string;
    email?: string;
    fechaNac?: Date;
    sexo?: string;
    user?: string;
    contrasenia?: string;
    idRecursivo?: Usuario;  
}
