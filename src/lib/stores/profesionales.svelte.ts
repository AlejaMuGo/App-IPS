import type { Profesional } from '$lib/types/profesional';

function normalizeString(string: string) {
	return string
		.normalize('NFD') // Descompone caracteres con tildes
		.replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (tildes)
		.replace(/[^\w\s]/gi, '') // Elimina caracteres especiales excepto letras y números
		.toLowerCase(); // Convierte a minúsculas
}

export class ProfesionalStore {
	searchValue = $state('');
	profesionales: Profesional[] = $state([]);
	filtered: Profesional[] = $derived(
		this.profesionales.filter((profesional) => {
			if (this.searchValue === '') {
				return true;
			}

			const matchNombre = normalizeString(profesional.nombre)
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
			const matchEmail = normalizeString(profesional.email)
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
			const matchDocumento = normalizeString(profesional.documento.toString())
				.toLowerCase()
				.includes(normalizeString(this.searchValue));

			return matchNombre || matchEmail || matchDocumento;
		})
	);
	constructor(profesionales: Profesional[]) {
		this.profesionales = profesionales;
	}
	// Método para agregar un nuevo profesional
	addProfesional(profesional: Profesional) {
		this.profesionales.push(profesional); // Agregar profesional sin mutar el estado
	}
}
