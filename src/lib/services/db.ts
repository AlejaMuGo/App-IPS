import { supabase } from '$lib/services/supabase';
import type { Client } from '$lib/types/client';

export class DatabaseController {
	async createClient(client: Client): Promise<Client | null> {
		const { data, error } = await supabase.from('client').insert([client]).select();

		if (error !== null) {
			console.log(error);
			return null;
		}

		if (data === null || data.length === 0) {
			return null;
		}

		return data[0] as Client;
	}

	async getClientes(): Promise<Client[]> {
		let { data: clients, error } = await supabase.from('client').select('*');
		return clients as Client[];
	}

	async updateClient(id: number, client: Partial<Client>): Promise<Client | null> {
		const { data, error } = await supabase.from('client').update(client).eq('id', id).select();

		if (error !== null) {
			console.log(error);
			return null;
		}

		if (data === null || data.length === 0) {
			return null;
		}

		return data[0] as Client;
	}
}
