function RecursoCard({ recurso }) {
  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      style={{ background: "black" }}
    >
      <h1 className="font-bold uppercase whitespace-nowrap">
        {recurso.nombre}
      </h1>
      <p className="text-slate-400">Fecha ingreso: {recurso.fecha_ingreso}</p>
    </div>
  );
}

export default RecursoCard;
