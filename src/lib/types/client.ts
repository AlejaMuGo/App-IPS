export type Client = {
	id?: number;
	nombre: string;
	documento: string;
	telefono: string;
	email: string;
};

export const clientes: Client[] = [
	{
		id: 1,
		nombre: 'María Alejandra Munoz',
		documento: '1000557085',
		telefono: '3163956435',
		email: 'rusheraleja@gmail.com'
	},
	{
		id: 2,
		nombre: 'Juan Carlos Largo',
		documento: '1000890556',
		telefono: '3133790224',
		email: 'imlargo@gmail.com'
	},
	{
		id: 3,
		nombre: 'Paula Andrea Suarez',
		documento: '1000890355',
		telefono: '3153566745',
		email: 'horusapestoso@gmail.com'
	}
];
