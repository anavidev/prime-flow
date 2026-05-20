import MenuLateral from "./components/MenuLateral"
import ColunaTarefas from "./components/ColunaTarefas"

const tarefasExemplo = [
	{ id: 1, titulo: 'Pendentes', tarefas: [
		{ id: 1, titulo: "Compras da copa", descricao: 'Comprar pó de café, açúcar e leite para o escritório', autor: "João Silva", colaboradores: ["Maria Santos"], dataCriacao: "2026-05-19", status: "Pendente" },
		{ id: 2, titulo: "Alinhamento gerencial", descricao: 'Enviar e-mail para o chefe detalhando o progresso da nova funcionalidade', autor: "Ana Souza", colaboradores: [], dataCriacao: "2026-05-18", status: "Pendente" },
		{ id: 3, titulo: "Reunião de Marketing", descricao: 'Agendar reunião com a equipe para debater a nova campanha de fim de ano', autor: "Carlos Mendes", colaboradores: ["João Silva", "Lucas Pereira"], dataCriacao: "2026-05-19", status: "Pendente" },
		{ id: 4, titulo: "Reunião de Marketing", descricao: 'Agendar reunião com a equipe para debater a nova campanha de fim de ano', autor: "Carlos Mendes", colaboradores: ["João Silva", "Lucas Pereira"], dataCriacao: "2026-05-19", status: "Pendente" },
	]},
	{ id: 2, titulo: 'Progresso', tarefas: [
		{ id: 4, titulo: "Módulo de Pagamento", descricao: 'Desenvolver novo módulo de integração com Gateway de Pix', autor: "Maria Santos", colaboradores: ["Carlos Mendes"], dataCriacao: "2026-05-15", status: "Em Progresso" },
		{ id: 5, titulo: "Code Review", descricao: 'Revisar código e aprovar o pull request da área de Dashboard', autor: "João Silva", colaboradores: ["Ana Souza"], dataCriacao: "2026-05-18", status: "Em Progresso" },
	]},
	{ id: 3, titulo: 'Concluídas', tarefas: [
		{ id: 6, titulo: "Planejamento Q2", descricao: 'Realizar reunião de planejamento trimestral e definir OKRs', autor: "Carlos Mendes", colaboradores: ["Equipe Inteira"], dataCriacao: "2026-05-10", status: "Concluída" },
		{ id: 7, titulo: "Atualizar Documentação", descricao: 'Escrever novos endpoints no Swagger e atualizar README.md', autor: "Ana Souza", colaboradores: [], dataCriacao: "2026-05-12", status: "Concluída" },
	]},
];

function App() {
  return (
    <div className="relative flex flex-column w-full h-screen">
			<MenuLateral />
			<div className="flex-1 p-4 flex gap-4 overflow-x-auto">
				{tarefasExemplo.map((coluna) => (
					<ColunaTarefas key={coluna.id} titulo={coluna.titulo} tarefaData={coluna.tarefas} />
				))}
			</div>
    </div>
  )
}

export default App