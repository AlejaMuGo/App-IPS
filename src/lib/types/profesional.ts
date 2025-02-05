type HoraDisponible = {
	inicio: string;
	fin: string;
};

type Fecha = {
	day: string;
	month: string;
	year: string;
};

type Horario = {
	fecha: Fecha;
	dia: string;
	horas: HoraDisponible[];
};

export enum Rol {
	MEDICA_ESTETICA = 'MEDICA_ESTETICA',
	COSMETOLOGA = 'COSMETOLOGA',
	NINGUNO = 'NINGUNO'
}

export type Profesional = {
	id?: number;
	nombre: string;
	documento: string;
	telefono: string;
	email: string;
	rol: Rol;
	disponibilidad?: Horario[];
};
