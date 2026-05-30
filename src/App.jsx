import { useState } from "react"
import MenuLateral from "./components/MenuLateral"
import ColunaTarefas from "./components/ColunaTarefas"
import Modal from "./components/Modal"

const tarefasExemplo = [
	{ id: 1, titulo: 'Pendentes', tarefas: [
		{ id: 1, titulo: "Compras da copa", descricao: 'Comprar pó de café, açúcar e leite para o escritório', autor: "João Silva", colaboradores: ["Maria Santos"], dataCriacao: "2026-05-19", status: "Pendente", tag: "front-end", inicio: "2026-05-20", prazoLimite: "2026-05-30", prioridade: "alta" },
		{ id: 2, titulo: "Alinhamento gerencial", descricao: 'Enviar e-mail para o chefe detalhando o progresso da nova funcionalidade', autor: "Ana Souza", colaboradores: [], dataCriacao: "2026-05-18", status: "Pendente", tag: "back-end", inicio: "2026-05-21", prazoLimite: "2026-05-29", prioridade: "média" },
		{ id: 3, titulo: "Reunião de Marketing", descricao: 'Agendar reunião com a equipe para debater a nova campanha de fim de ano', autor: "Carlos Mendes", colaboradores: ["João Silva", "Lucas Pereira"], dataCriacao: "2026-05-19", status: "Pendente", tag: "banco de dados", inicio: "2026-05-22", prazoLimite: "2026-06-02", prioridade: "baixa" },
		{ id: 4, titulo: "Reunião de Marketing", descricao: 'Agendar reunião com a equipe para debater a nova campanha de fim de ano', autor: "Carlos Mendes", colaboradores: ["João Silva", "Lucas Pereira"], dataCriacao: "2026-05-19", status: "Pendente", tag: "front-end", inicio: "2026-05-22", prazoLimite: "2026-06-03", prioridade: "alta" },
	]},
	{ id: 2, titulo: 'Progresso', tarefas: [
		{ id: 5, titulo: "Módulo de Pagamento", descricao: 'Desenvolver novo módulo de integração com Gateway de Pix', autor: "Maria Santos", colaboradores: ["Carlos Mendes"], dataCriacao: "2026-05-15", status: "Em Progresso", tag: "back-end", inicio: "2026-05-16", prazoLimite: "2026-05-28", prioridade: "média" },
		{ id: 6, titulo: "Code Review", codigo: "ABC-678", descricao: 'Revisar código e aprovar o pull request da área de Dashboard', autor: "João Silva", colaboradores: ["Ana Souza"], dataCriacao: "2026-05-18", status: "Em Progresso", tag: "banco de dados", inicio: "2026-05-19", prazoLimite: "2026-05-27", prioridade: "baixa" },
	]},
	{ id: 3, titulo: 'Concluídas', tarefas: [
		{ id: 7, titulo: "Planejamento Q2", descricao: 'Realizar reunião de planejamento trimestral e definir OKRs', autor: "Carlos Mendes", colaboradores: ["Equipe Inteira"], dataCriacao: "2026-05-10", status: "Concluída", tag: "front-end", inicio: "2026-05-11", prazoLimite: "2026-05-25", prioridade: "alta" },
		{ id: 8, titulo: "Atualizar Documentação", descricao: 'Escrever novos endpoints no Swagger e atualizar README.md', autor: "Ana Souza", colaboradores: [], dataCriacao: "2026-05-12", status: "Concluída", tag: "back-end", inicio: "2026-05-13", prazoLimite: "2026-05-26", prioridade: "média" },
	]},
];

function App() {
  const [colunas, setColunas] = useState(tarefasExemplo)
  const [selectedTarefa, setSelectedTarefa] = useState(null)

  const handleTarefaClick = (tarefa) => {
    setSelectedTarefa(tarefa)
  }

  const handleCloseModal = () => {
    setSelectedTarefa(null)
  }

  const handleSalvarTarefa = (tarefaAtualizada) => {
    setColunas((prevColunas) => prevColunas.map((coluna) => ({
      ...coluna,
      tarefas: coluna.tarefas.map((tarefa) => tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa),
    })))
    setSelectedTarefa(null)
  }

  const handleExcluirTarefa = (tarefaId) => {
    setColunas((prevColunas) => prevColunas.map((coluna) => ({
      ...coluna,
      tarefas: coluna.tarefas.filter((tarefa) => tarefa.id !== tarefaId),
    })))
    setSelectedTarefa(null)
  }

  return (
    <div className="relative flex flex-column w-full h-screen">
      <MenuLateral />
      <div className="flex-1 p-4 flex gap-4 overflow-x-auto">
        {colunas.map((coluna) => (
          <ColunaTarefas
            key={coluna.id}
            titulo={coluna.titulo}
            tarefaData={coluna.tarefas}
            onTarefaClick={handleTarefaClick}
          />
        ))}
      </div>
      <Modal
        isOpen={Boolean(selectedTarefa)}
        tarefa={selectedTarefa}
        onClose={handleCloseModal}
        onSave={handleSalvarTarefa}
        onDelete={handleExcluirTarefa}
      />
    </div>
  )
}

export default App