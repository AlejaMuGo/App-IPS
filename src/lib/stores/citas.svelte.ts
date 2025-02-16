import type { Cita } from "$lib/types/cita";
import { citaCumpleFiltroFecha, citaCumpleFiltroEstado } from "$lib/tools/filtros";
import type { OpcionesFiltroEstado, OpcionesFiltroFecha } from "$lib/types/filtros";

function normalizeString(string: string) {
	return string
		.normalize('NFD') // Descompone caracteres con tildes
		.replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (tildes)
		.replace(/[^\w\s]/gi, '') // Elimina caracteres especiales excepto letras y números
		.toLowerCase(); // Convierte a minúsculas
}

export class citaStore {
	searchValue = $state('');
	citas: Cita[] = $state([]);

	filters = $state({
		estado: "" as OpcionesFiltroEstado,
		fecha: "" as OpcionesFiltroFecha,
	})

	filtered: Cita[] = $derived(
		this.citas.filter((cita) => {

			let filtroBusqueda = this.searchValue === "" ? true : false;
			if (this.searchValue !== '') {
				const matchCliente = normalizeString(cita.client.nombre.toString())
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
				const matchProfesional = normalizeString(cita.profesional.nombre.toString())
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
				const matchFecha = normalizeString(cita.date.toString())
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
				const matchHora = normalizeString(cita.start_time)
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
				const matchServicio= normalizeString(cita.service.nombre.toString()).toLowerCase()
				.includes(normalizeString(this.searchValue));

				filtroBusqueda =  matchCliente || matchProfesional || matchFecha || matchHora || matchServicio;
			}

			const matchFiltroEstado = citaCumpleFiltroEstado(cita, this.filters.estado);
			const matchFiltroFecha = citaCumpleFiltroFecha(cita, this.filters.fecha);

			return filtroBusqueda && matchFiltroEstado && matchFiltroFecha;
		})
	);

	constructor(citas: Cita[]) {
		this.citas = citas.sort((a, b) => {
			const today = new Date();
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			const diffA = Math.abs(dateA.getTime() - today.getTime());
			const diffB = Math.abs(dateB.getTime() - today.getTime());
			return diffA - diffB;
		});
	}
	
	// Método para agregar un nuevo cliente
	addCita(cita: Cita) {
		this.citas.push(cita);
	}
	removeCita(id: number) {
		this.citas = this.citas.filter(prof => prof.id !== id);
	}

	
}
