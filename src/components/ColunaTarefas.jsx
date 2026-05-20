import { useState } from 'react';
import Tarefa from './Tarefa';

// TODO: Receber as tarefas e o titulo das colunas como props do componente pai (App.jsx)
export default function ColunaTarefas({ titulo = "Tarefas", tarefaData = [] }) {
	// useState inicializa a lista com o tarefaData recebido do componente pai
	const [tarefas, setTarefas] = useState(tarefaData);

	return (
		<div className="bg-gray-100 p-4 rounded shadow min-w-62.5 max-w-75 w-full overflow-y-auto custom-scrollbar">
			<h2 className="text-lg font-bold mb-4 text-black">{titulo}</h2>
			<ul>
				{/* Verifica se 'tarefas' existe e é um array antes de fazer o map */}
				{Array.isArray(tarefas) && tarefas.map((tarefa) => (
					<Tarefa key={tarefa.id} tarefa={tarefa} />
				))}
			</ul>
		</div>
	);
}