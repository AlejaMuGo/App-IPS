import type { Client } from "./client"
import type { Profesional } from "./profesional"
import type { Service } from "./service";

export type Cita = {
    id?: number;
    client: Client;
    service: Service;
    profesional: Profesional;
    date: string;
    start_time: string;
    end_time: string;
}