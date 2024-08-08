import { useEffect, useState } from "react";
import { getRecursos } from "../api/tareas.api";
import { toast } from "react-hot-toast";
import RecursoCard from "../components/RecursoCard";
import { Navigation } from "../components/Navigation";

export function RecursosPage() {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    async function recursos() {
      try {
        const recursos = await getRecursos();
        setRecursos(recursos.data);
      } catch (error) {
        toast.error("Error al cargar los recursos", {
          duration: 2000,
        });
      }
    }
    recursos();
  }, []);

  return (
    <Navigation>
      <div className="grid grid-rows-2 gap-3">
        <div className="grid grid-cols-5 gap-3">
          {recursos.map((recurso) => (
            <RecursoCard recurso={recurso} key={recurso.id} />
          ))}
        </div>
      </div>
    </Navigation>
  );
}
