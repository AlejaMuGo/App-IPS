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

type Profesional = {
	nombre: string;
	documento: string;
	telefono: string;
	email: string;
	rol: 'medica estetica' | 'cosmetologa';
	disponibilidad: Horario[];
};
