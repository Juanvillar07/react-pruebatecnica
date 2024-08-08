import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  crearTarea,
  eliminarTarea,
  actualizarTarea,
  getTarea,
} from "../api/tareas.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigation } from "../components/Navigation";

export function TareasFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await actualizarTarea(params.id, data);
      toast.success("Tarea actualizada correctamente", {
        style: {
          backgroundColor: "#101010",
          color: "#fff",
          duration: 2000,
        },
      });
    } else {
      await crearTarea(data);
      toast.success("Tarea creada correctamente", {
        style: {
          backgroundColor: "#101010",
          color: "#fff",
          duration: 2000,
        },
      });
    }
    navigate("/tareas");
  });

  useEffect(() => {
    async function cargarTarea() {
      if (params.id) {
        const res = await getTarea(params.id);
        setValue("titulo", res.data.titulo);
        setValue("descripcion", res.data.descripcion);
        setValue("completado", res.data.completado);
      }
    }
    cargarTarea();
  }, []);

  return (
    <Navigation>
      <div className="max-w-xl mx-auto">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Titulo"
            {...register("titulo", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mt-3"
          />
          {errors.titulo && <span>Este campo es requerido</span>}

          <textarea
            rows="3"
            placeholder="Descripcion"
            id=""
            {...register("descripcion", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mt-3"
          ></textarea>
          {errors.descripcion && <span>Este campo es requerido</span>}

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="completado"
              {...register("completado")}
              className="bg-zinc-700 p-3 rounded-lg mr-2"
            />
            <label htmlFor="completado" className="text-gray-400">
              Marcar como completada
            </label>
          </div>

          <button className="bg-green-700 p-3 rounded-lg block w-full mt-3">
            Guardar tarea
          </button>
        </form>

        {params.id && (
          <button
            className="bg-red-500 p-3 rounded-lg w-full mt-3"
            onClick={async () => {
              const aceptado = window.confirm(
                "¿Estas seguro de eliminar esta tarea?"
              );
              if (aceptado) {
                await eliminarTarea(params.id);
                toast.success("Tarea eliminada correctamente", {
                  style: {
                    backgroundColor: "#101010",
                    color: "#fff",
                    duration: 2000,
                  },
                });
                navigate("/tareas");
              }
            }}
          >
            Eliminar tarea
          </button>
        )}
      </div>
    </Navigation>
  );
}
