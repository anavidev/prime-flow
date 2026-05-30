import Tarefa from './Tarefa';

// Recebe o título, as tarefas e o callback para abrir o modal quando uma tarefa for clicada
export default function ColunaTarefas({ titulo = "Tarefas", tarefaData = [], onTarefaClick = () => {} }) {
	return (
		<div className="bg-gray-100 p-4 rounded shadow min-w-62.5 max-w-75 w-full overflow-y-auto custom-scrollbar">
			<h2 className="text-lg font-bold mb-4 text-black">{titulo}</h2>
			<ul>
				{/* Verifica se 'tarefaData' existe e é um array antes de fazer o map */}
				{Array.isArray(tarefaData) && tarefaData.map((tarefa) => (
					<Tarefa key={tarefa.id} tarefa={tarefa} onClick={() => onTarefaClick(tarefa)} />
				))}
			</ul>
		</div>
	);
}