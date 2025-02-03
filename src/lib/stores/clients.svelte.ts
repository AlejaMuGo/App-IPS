import type { Client } from '$lib/types/client';

function normalizeString(string: string) {
	return string
		.normalize('NFD') // Descompone caracteres con tildes
		.replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (tildes)
		.replace(/[^\w\s]/gi, '') // Elimina caracteres especiales excepto letras y números
		.toLowerCase(); // Convierte a minúsculas
}

export class ClientStore {
	searchValue = $state('');
	clients: Client[] = $state([]);
	filtered: Client[] = $derived(
		this.clients.filter((client) => {
			if (this.searchValue === '') {
				return true;
			}

			const matchNombre = normalizeString(client.nombre)
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
			const matchEmail = normalizeString(client.email)
				.toLowerCase()
				.includes(normalizeString(this.searchValue));
			const matchId = normalizeString(client.documento.toString())
				.toLowerCase()
				.includes(normalizeString(this.searchValue));

			return matchNombre || matchEmail || matchId;
		})
	);

	constructor(clients: Client[]) {
		this.clients = clients;
	}
	// Método para agregar un nuevo cliente
	addClient(client: Client) {
		this.clients.push(client); // Agregar cliente sin mutar el estado
	}
}
