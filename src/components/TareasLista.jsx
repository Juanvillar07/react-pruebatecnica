import { useEffect, useState } from "react";
import { getTodasTareas } from "../api/tareas.api";
import { TareaCard } from "./TareaCard";
import { Navigation } from "./Navigation";

export function TareasLista() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    async function cargarTareas() {
      try {
        const res = await getTodasTareas();
        setTareas(res.data);
      } catch (error) {
        alert("Error al cargar las tareas");
      }
    }

    cargarTareas();
  }, []);

  return (
    <Navigation>
      <div className="grid grid-cols-3 gap-3">
        {tareas.map((tarea) => (
          <TareaCard tarea={tarea} key={tarea.id} />
        ))}
      </div>
    </Navigation>
  );
}
