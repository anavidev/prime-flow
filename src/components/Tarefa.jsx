export default function Tarefa({ tarefa }) {
	return (
		<li className="bg-white p-2 mb-2 rounded-lg shadow text-black">
			<h3 className="font-bold">{tarefa.titulo}</h3>
			<span className="border border-gray-700 px-2 py-1 text-xs font-semibold rounded-md">{tarefa.dataCriacao}</span>
			{/* <p>{tarefa.descricao}</p> */}
			<div className="my-2 flex flex-row items-end gap-2 justify-between">
				<p className="text-md text-gray-500">{tarefa.id}</p>
				<div className=" h-4 mx-2 flex flex-row items-end gap-2">
					<p className="text-sm text-gray-500">{tarefa.status}</p>
					<div className="my-2 flex flex-row items-end gap-2">
						<img src="https://api.dicebear.com/9.x/avataaars/svg?seed=João Silva" alt="Avatar do Autor" className="w-6 h-6 rounded-full bg-gray-200" />
						{tarefa.colaboradores.map((colaborador, index) => (
							<img key={index} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${colaborador}`} alt={`Avatar de ${colaborador}`} className="w-6 h-6 rounded-full bg-gray-200" />
						))}
					</div>
				</div>
			</div>
		</li>
	);
}