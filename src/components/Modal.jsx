import { useEffect, useMemo, useState } from "react";

export default function Modal({ isOpen, onClose, tarefa, onSave, onDelete }) {
	const [formData, setFormData] = useState({
		tag: "",
		inicio: "",
		prazoLimite: "",
		colaboradores: [],
		prioridade: "",
		descricao: "",
	});
	const [buscaColaborador, setBuscaColaborador] = useState("");

	useEffect(() => {
		if (tarefa) {
			setFormData({
				tag: tarefa.tag || "",
				inicio: tarefa.inicio || "",
				prazoLimite: tarefa.prazoLimite || "",
				colaboradores: Array.isArray(tarefa.colaboradores) ? tarefa.colaboradores : [],
				prioridade: tarefa.prioridade || "",
				descricao: tarefa.descricao || "",
			});
		}
	}, [tarefa]);

	const colaboradoresDisponiveis = ["Maria Santos", "João Silva", "Ana Souza", "Lucas Pereira", "Carlos Mendes", "Equipe Inteira"];

	const colaboradoresFiltrados = useMemo(() => {
		const termo = buscaColaborador.trim().toLowerCase();
		if (!termo) return [];
		return colaboradoresDisponiveis.filter((nome) => nome.toLowerCase().includes(termo));
	}, [buscaColaborador]);

	const adicionarColaborador = (nome) => {
		if (!formData.colaboradores.includes(nome)) {
			setFormData((prev) => ({ ...prev, colaboradores: [...prev.colaboradores, nome] }));
		}
		setBuscaColaborador("");
	};

	const removerColaborador = (nome) => {
		setFormData((prev) => ({
			...prev,
			colaboradores: prev.colaboradores.filter((item) => item !== nome),
		}));
	};

	if (!isOpen || !tarefa) return null;

	const handleSalvar = () => {
		if (formData.inicio && formData.prazoLimite && new Date(formData.prazoLimite) < new Date(formData.inicio)) {
			alert("O prazo não pode ser menor que a data de início.");
			return;
		}

		const tarefaAtualizada = {
			...tarefa,
			...formData,
			prazoLimite: formData.prazoLimite || tarefa.prazoLimite,
		};

		onSave?.(tarefaAtualizada);
		onClose();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-200"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-3xl rounded-3xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.22)]"
				onClick={(e) => e.stopPropagation()}
			>
				{/* fechar modal */}
				<button
					aria-label="Fechar modal"
					onClick={onClose}
					className="absolute right-6 top-6 text-2xl font-bold text-gray-400 hover:text-gray-700 transition"
				>
					X
				</button>
				{/* "header": titulo e id da task */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-sky-800 leading-tight">{tarefa.titulo || "Título da Tarefa"}</h2>
					<p className="text-base font-medium text-gray-500 mt-1">{tarefa.id || "ABC-123"}</p>
				</div>

				<div className="flex gap-8 items-stretch">

					{/* "main": descrição e informações */}
					<div className="flex-1 flex flex-col">
						<label className="block text-base font-semibold text-sky-800 mb-2">Descrição</label>
						<textarea
							className="w-full h-[415px] rounded-2xl bg-sky-100 p-4 text-base text-sky-900 resize-none outline-none border-none"
							value={formData.descricao}
							onChange={(e) => setFormData((prev) => ({ ...prev, descricao: e.target.value }))}
						/>
					</div>
					<div className="w-[320px] flex flex-col gap-4 justify-stretch">
						<label className="text-base font-semibold text-sky-800">Informações</label>
						<div className="flex flex-col gap-3 mt-2">
							<div>
								{/* campo de tag */}
								<label className="block text-sm font-medium text-sky-800 mb-1">Tag</label>
								<select
									value={formData.tag}
									onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
									className="w-full rounded-md bg-sky-100 px-3 py-2 text-sky-900 outline-none border-none"
								>
									<option value="">Selecione uma opção</option>
									<option value="FrontEnd">Front End</option>
									<option value="BackEnd">Back End</option>
									<option value="BancoDeDados">Banco de Dados</option>
								</select>
							</div>
							<div>
								{/* campo de início */}
								<label className="block text-sm font-medium text-sky-800 mb-1">Início</label>
								<input
									type="date"
									value={formData.inicio}
									onChange={(e) => setFormData((prev) => ({ ...prev, inicio: e.target.value }))}
									className="w-full rounded-md bg-sky-100 px-3 py-2 text-sky-900 outline-none border-none"
								/>
							</div>
							<div>
								{/* campo de prazo */}
								<label className="block text-sm font-medium text-sky-800 mb-1">Prazo</label>
								<input
									type="date"
									value={formData.prazoLimite}
									onChange={(e) => setFormData((prev) => ({ ...prev, prazoLimite: e.target.value }))}
									className="w-full rounded-md bg-sky-100 px-3 py-2 text-sky-900 outline-none border-none"
								/>
							</div>
							<div>
								{/* campo de colaboradores */}
								<label className="block text-sm font-medium text-sky-800 mb-1">Colaboradores</label>
								<div className="rounded-md bg-sky-100 px-3 py-2">
									<div className="flex flex-wrap gap-2">
										{formData.colaboradores.map((nome) => (
											<button
												type="button"
												key={nome}
												onClick={() => removerColaborador(nome)}
												className="rounded-full bg-white px-3 py-1 text-sm text-sky-900 shadow-sm hover:bg-sky-200"
											>
												{nome} X
											</button>
										))}
										<input
											type="text"
											value={buscaColaborador}
											onChange={(e) => setBuscaColaborador(e.target.value)}
											placeholder="Digite para buscar um nome"
											className="min-w-[180px] flex-1 bg-transparent text-sky-900 outline-none placeholder:text-sky-1000"
											/>
									</div>
								</div>
								{buscaColaborador.trim().length > 0 && colaboradoresFiltrados.length > 0 && (
									<div className="mt-2 rounded-md border border-sky-100 bg-white p-2 shadow-sm">
										{colaboradoresFiltrados.slice(0, 5).map((nome) => (
											<button
												type="button"
												key={nome}
												onClick={() => adicionarColaborador(nome)}
												className="block w-full rounded-md px-3 py-2 text-left text-sm text-sky-900 hover:bg-sky-50"
											>
												{nome}
											</button>
										))}
									</div>
								)}
								{formData.colaboradores.length === 0 && (
									<p className="mt-2 text-sm text-sky-700">Nenhum colaborador selecionado</p>
								)}
							</div>
							<div>
								{/* campo de prioridade */}
								<label className="block text-sm font-medium text-sky-800 mb-1">Prioridade</label>
								<select
									value={formData.prioridade}
									onChange={(e) => setFormData((prev) => ({ ...prev, prioridade: e.target.value }))}
									className="w-full rounded-md bg-sky-100 px-3 py-2 text-sky-900 outline-none border-none"
								>
									<option value="">Selecione uma opção</option>
									<option value="Alta">Alta</option>
									<option value="Media">Média</option>
									<option value="Baixa">Baixa</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				{/* "footer": botões de ação */}
				<div className="flex items-center justify-between mt-8">
					<button
						type="button"
						onClick={() => onDelete?.(tarefa.id)}
						className="text-sky-700 font-medium hover:underline px-2 py-1 rounded"
					>
						Excluir Tarefa
					</button>
					<button
						type="button"
						onClick={handleSalvar}
						className="rounded-md bg-sky-700 px-8 py-2 text-base font-semibold text-white shadow transition hover:bg-sky-800"
					>
						Salvar Tarefa
					</button>
				</div>
			</div>
		</div>
	);
}
