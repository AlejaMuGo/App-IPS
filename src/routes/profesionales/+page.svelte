<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import TableCell from '$lib/components/ui/table/table-cell.svelte';
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";

	let { data }: { data: PageData } = $props();
</script>

<main class="flex flex-col gap-12 px-12 py-12">
	<div class="flex justify-between px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Gestión de profesionales</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
		<Button
			variant="secondary"
			href="/profesionales/crear"
			class="bg-indigo-500 text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 hover:text-indigo-900 "
			>Añadir profesional</Button
		>
	</div>
	<div class="space-y-4">
		<div>
			<Input class="w-96" placeholder="Busca por nombre, cedula o correo" />
		</div>

		<div class="flex">
			<Table.Root>
				<Table.Caption>Listado de clientes</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Nombre</Table.Head>
						<Table.Head>Documento</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head>Telefono</Table.Head>
						<Table.Head>Rol</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium">1</Table.Cell>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1</Table.Cell>
						<TableCell>
							<div class="flex space-x-2">
								<div class="text-white hover:text-indigo-500">
									<Button
			class="bg- h-7 bg-indigo-200 text-indigo-500 hover:text-white hover:scale-105 border-2 border-indigo-500 hover:border-indigo-500 hover:bg-indigo-500"
		>
			<i class="bi bi-pencil-square"> </i>
		</Button>
								</div>
								<div>
									<AlertDialog.Root>
										<AlertDialog.Trigger><Button class="bg- h-7 border-2 border-red-500 text-red-500 bg-red-100 hover:scale-105 hover:border-red-500 hover:bg-red-500 hover:text-white ">
											<i class="bi bi-trash3"></i><span>Eliminar</span></Button></AlertDialog.Trigger>
										<AlertDialog.Content>
										  <AlertDialog.Header>
											<AlertDialog.Title>¿Estás completamente seguro?</AlertDialog.Title>
											<AlertDialog.Description>
												Esta acción no se puede deshacer. Esto eliminará permanentemente el profesional de la base de datos.
											</AlertDialog.Description>
										  </AlertDialog.Header>
										  <AlertDialog.Footer>
											<AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
											<AlertDialog.Action>Continuar</AlertDialog.Action>
										  </AlertDialog.Footer>
										</AlertDialog.Content>
									</AlertDialog.Root>
								</div>
							</div>
						</TableCell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</main>
