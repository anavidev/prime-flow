import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';
import { users, tags } from '../dados';

const TaskModal = ({ isOpen, onClose, task, onSave, onDelete }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  if (!isOpen || !formData) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAssignee = (e) => {
    const val = e.target.value;
    if (val && !formData.assignees?.includes(val)) {
      handleChange('assignees', [...(formData.assignees || []), val]);
    }
    e.target.value = '';
  };

  const handleRemoveAssignee = (idToRemove) => {
    handleChange('assignees', formData.assignees.filter(id => id !== idToRemove));
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-prime-preto-60 flex items-center justify-center p-8"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-prime-branco-bord rounded-modal shadow-[8px_8px_10px_0_rgba(0,0,0,0.10)] w-[900px] max-h-[calc(100vh-64px)] flex flex-col overflow-hidden relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[18px] right-5 w-7 h-7 rounded-full border-none bg-transparent grid place-items-center cursor-pointer text-prime-azul text-[20px] leading-none font-light hover:bg-prime-azul-25"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top */}
        <div className="px-8 pt-7 pb-5 shrink-0">
          <input
            type="text"
            className="text-[28px] font-semibold text-prime-preto mb-1 bg-transparent border-none outline-none w-full placeholder:text-prime-preto-50"
            value={formData.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Título da Tarefa"
            autoFocus
          />
          <div className="text-[15px] font-medium text-prime-preto-50">
            {formData.id || "Nova Tarefa"}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-7">

          {/* Left Column: Description */}
          <div className="flex flex-col">
            <div className="bg-prime-azul-25 rounded-desc py-4 px-5 flex-1 min-h-[280px] flex flex-col">
              <div className="text-[17px] font-medium text-prime-azul mb-2.5 shrink-0">
                Descrição
              </div>
              <textarea
                className="flex-1 border-none bg-transparent outline-none font-sans text-[14px] text-prime-preto resize-none leading-[1.55] placeholder:text-[rgba(17,111,152,0.45)]"
                placeholder="Escreva uma descrição para a tarefa..."
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="pt-0 flex flex-col gap-0.5">
            <div className="text-[17px] font-medium text-prime-azul mb-3.5">
              Informações
            </div>

            {/* Tag */}
            <div className="grid grid-cols-[110px_1fr] items-center gap-2.5 py-2.5 border-b border-[rgba(17,111,152,0.10)]">
              <span className="text-[14px] font-normal text-prime-azul whitespace-nowrap">Tag</span>
              <div className="bg-prime-azul-25 rounded-form h-[30px] flex items-center px-2.5 cursor-pointer relative overflow-hidden">
                <select
                  className="appearance-none flex-1 bg-transparent outline-none text-[12px] font-normal text-prime-azul w-full h-full cursor-pointer z-10"
                  value={formData.tags?.[0] || ''}
                  onChange={e => handleChange('tags', e.target.value ? [e.target.value] : [])}
                >
                  <option value="">Selecione uma tag</option>
                  {tags.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-prime-azul shrink-0 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Início */}
            <div className="grid grid-cols-[110px_1fr] items-center gap-2.5 py-2.5 border-b border-[rgba(17,111,152,0.10)]">
              <span className="text-[14px] font-normal text-prime-azul whitespace-nowrap">Início</span>
              <div className="bg-prime-azul-25 rounded-form h-[30px] flex items-center px-2.5 relative overflow-hidden">
                <input
                  type="date"
                  className="flex-1 bg-transparent outline-none text-[12px] font-normal text-prime-azul w-full h-full [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer z-10"
                  value={formData.startDate || ''}
                  onChange={e => handleChange('startDate', e.target.value)}
                />
                <Calendar className="w-4 h-4 text-prime-azul shrink-0 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Prazo */}
            <div className="grid grid-cols-[110px_1fr] items-center gap-2.5 py-2.5 border-b border-[rgba(17,111,152,0.10)]">
              <span className="text-[14px] font-normal text-prime-azul whitespace-nowrap">Prazo</span>
              <div className="bg-prime-azul-25 rounded-form h-[30px] flex items-center px-2.5 relative overflow-hidden">
                <input
                  type="date"
                  className="flex-1 bg-transparent outline-none text-[12px] font-normal text-prime-azul w-full h-full [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer z-10"
                  value={formData.endDate || ''}
                  onChange={e => handleChange('endDate', e.target.value)}
                />
                <Calendar className="w-4 h-4 text-prime-azul shrink-0 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Colaboradores */}
            <div className="grid grid-cols-[110px_1fr] items-center gap-2.5 py-2.5 border-b border-[rgba(17,111,152,0.10)]">
              <span className="text-[14px] font-normal text-prime-azul whitespace-nowrap">Colaboradores</span>
              <div className="bg-prime-azul-25 rounded-form min-h-[30px] h-auto flex items-center flex-wrap gap-1 py-1 px-2 relative pr-7">
                {formData.assignees?.map(assigneeId => {
                  const u = users.find(u => u.id === assigneeId);
                  if (!u) return null;
                  return (
                    <div key={u.id} className="inline-flex items-center gap-[5px] bg-prime-azul-25 rounded-form py-0.5 pr-1.5 pl-1 text-[11px] text-prime-azul z-20">
                      <div className="w-4 h-4 rounded-full bg-prime-azul text-white grid place-items-center text-[8px] font-bold">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      {u.name.split(' ')[0]}
                      <X onClick={() => handleRemoveAssignee(u.id)} className="w-3 h-3 cursor-pointer text-prime-azul ml-0.5 hover:text-[#a00]" />
                    </div>
                  );
                })}
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleAddAssignee}
                  value=""
                >
                  <option value="" disabled>Adicionar colaborador...</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-prime-azul shrink-0 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Prioridade */}
            <div className="grid grid-cols-[110px_1fr] items-center gap-2.5 py-2.5">
              <span className="text-[14px] font-normal text-prime-azul whitespace-nowrap">Prioridade</span>
              <div className="bg-prime-azul-25 rounded-form h-[30px] flex items-center px-2.5 cursor-pointer relative overflow-hidden">
                <select
                  className="appearance-none flex-1 bg-transparent outline-none text-[12px] font-normal text-prime-azul w-full h-full cursor-pointer z-10"
                  value={formData.priority || ''}
                  onChange={e => handleChange('priority', e.target.value)}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-prime-azul shrink-0 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-4 pb-6 shrink-0">
          <div>
            {formData.id && (
              <button onClick={() => onDelete(formData.id)} className="text-[14px] font-semibold text-prime-azul bg-transparent border-none cursor-pointer underline underline-offset-2 hover:text-[#a00]">
                Excluir Tarefa
              </button>
            )}
          </div>
          <button 
            onClick={() => {
              const today = new Date().toISOString().split('T')[0];
              if (!formData.title || !formData.startDate || !formData.endDate || !formData.priority || !formData.assignees || formData.assignees.length === 0) {
                alert('Verifique os campos obrigatórios: Título, Início, Prazo, Prioridade e pelo menos um colaborador.');
                return;
              }
              if (formData.startDate < today) {
                alert('A data de início não pode ser anterior ao dia de hoje.');
                return;
              }
              if (formData.endDate < today) {
                alert('A data final não pode ser anterior ao dia de hoje.');
                return;
              }
              if (formData.endDate < formData.startDate) {
                alert('A data final não pode ser anterior à data de início.');
                return;
              }
              onSave(formData);
            }} 
            className="bg-prime-azul text-white border-none rounded-btn h-10 px-9 font-sans text-[15px] font-semibold cursor-pointer transition-colors hover:bg-[#0d5878]"
          >
            {formData.id ? 'Salvar Tarefa' : 'Criar Tarefa'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaskModal;
