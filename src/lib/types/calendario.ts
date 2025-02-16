export type Evento<T = any> = {
    title: string;
    fecha: string;
    inicio: string; // Fecha y hora de inicio en formato ISO (ej: "2023-10-25T09:00:00")
    final: string; 
    color: string; // Fecha y hora de finalización en formato ISO (ej: "2023-10-25T10:00:00")
    data: T; 
    Notas?: string;       // Datos adicionales (en este caso, una Cita)
};