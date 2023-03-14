export class DataAuthenticate {
  dataAuth: DataAuth | undefined;
  token: string | undefined;
  agentId: string | undefined;
}

export interface DataAuth {
  AuthSesion: AuthSesionResponse;
  AuthUsuario: AuthUsuarioResponse;
  AuthRolUsuario: AuthRolUsuarioResponse;
  AuthMenu: AuthMenuResponse;
  AuthAccion: AuthAccionResponse;
  AuthSistemasAdministradosUsuario: AuthSistemasAdministradosUsuarioResponse;
}

export interface AuthAccionResponse {
  Data: AuthAccion[];
  HasErrors: boolean;
  Messages: any[];
  KEY_OUTPUT: null;
}

export interface AuthAccion {
  ID_ROL: number;
  ID_MENU: number;
  ID_PERMISO: number;
  NOMBRE_PERMISO: NombrePermiso;
}

export enum NombrePermiso {
  Acceder = "Acceder             ",
  Agregar = "Agregar             ",
  Consultar = "Consultar           ",
  Eliminar = "Eliminar            ",
  Exportar = "Exportar            ",
}

export interface AuthMenuResponse {
  Data: AuthMenu[];
  HasErrors: boolean;
  Messages: any[];
  KEY_OUTPUT: null;
}

export interface AuthMenu {
  ID_MENU: number;
  CODIGO: string;
  NOMBRE_MENU: string;
  NOMBRE_ICONO: string;
  ORDEN_MENU: number;
  ID_MENU_PADRE: number;
  URL: string;
  TIPO_OPCION: number;
}

export interface AuthRolUsuarioResponse {
  Data: AuthRolUsuario[];
  HasErrors: boolean;
  Messages: any[];
  KEY_OUTPUT: null;
}

export interface AuthRolUsuario {
  ID_ROL: number;
  CODIGO_ROL: string;
  NOMBRE_ROL: string;
  ID_SEDE: number;
  CODIGO_SEDE: string;
  CODIGO_LOCAL_SEDE: string;
  CODIGO_PADRE_SEDE: string;
  ANEXO_SEDE: string;
  NOMBRE_SEDE: string;
  ID_TIPO_SEDE: number;
  CODIGO_TIPO_SEDE: string;
  DESCRIPCION_TIPO_SEDE: string;
  POR_DEFECTO: boolean;
  URL_DEFAULT: string;
}

export interface AuthSesionResponse {
  Data: AuthSesion[];
  HasErrors: boolean;
  Messages: any[];
  KEY_OUTPUT: null;
}

export interface AuthSesion {
  FECHA_CREACION: Date;
  FECHA_CADUCIDAD: Date;
  FECHA_ULTIMA_SESION: Date;
}

export interface AuthSistemasAdministradosUsuarioResponse {
  Data: AuthSistemasAdministradosUsuario[];
  HasErrors: boolean;
  Messages: any[];
  KEY_OUTPUT: null;
}

export interface AuthSistemasAdministradosUsuario {
  ID_SISTEMA: number;
  CODIGO_SISTEMA: string;
  NOMBRE_SISTEMA: string;
  ABREVIATURA_SISTEMA: string;
  URL_SISTEMA: string;
  PASSPORTv4: boolean;
  NOMBRE_LOGO: string;
  ID_USUARIO: number;
  USER_NAME: string;
}

export interface AuthUsuarioResponse {
  Data: AuthUsuario[];
  HasErrors: boolean;
  Messages: any[];
  KEY_OUTPUT: null;
}

export interface AuthUsuario {
  ID_USUARIO: number;
  NOMBRES_USUARIO: string;
  APELLIDO_PATERNO: string;
  APELLIDO_MATERNO: string;
  ID_TIPO_DOCUMENTO_ENUM: number;
  TIPO_DOCUMENTO_ENUM: string;
  NUMERO_DOCUMENTO: string;
  FECHA_NACIMIENTO: Date;
  CORREO_USUARIO: string;
  CONTRASENIA: null;
  CONTRASENIA_SALT: null;
}
