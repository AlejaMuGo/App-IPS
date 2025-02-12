import type { Cita } from "$lib/types/cita";

export function citaCumpleFiltroEstado(cita: Cita, valorFiltro: "confirmada" | "noconfirmada" | ""): boolean {
		if (valorFiltro === "") return true;

		const valueEstado = valorFiltro === "confirmada" ? true : false;
		if (cita.confirmed === valueEstado) {
			return true;
		} else {
			return false;
		}
}