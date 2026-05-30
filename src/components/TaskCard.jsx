import React from 'react';
import { Calendar, ChevronsDown } from 'lucide-react';
import { users } from '../dados';

const TaskCard = ({ task, onClick, onDragStart }) => {
  // Buscar a inicial do primeiro assignee mockado
  const firstAssignee = task.assignees?.length > 0
    ? users.find(u => u.id === task.assignees[0])
    : null;

  // Formatar data mockada
  const formattedDate = task.endDate
    ? new Date(task.endDate).toLocaleDateString('pt-BR')
    : 'DD/MM/AAAA';

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-prime-card-bg rounded-card p-4 pb-3.5 flex flex-col gap-2 cursor-pointer transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing"
      onClick={onClick}
    >
      <div className="text-[15px] font-bold text-prime-preto leading-[1.4]">
        {task.title || 'Um título de tarefa do projeto.'}
      </div>

      <div>
        <div className="inline-flex items-center gap-[5px] border border-prime-azul rounded-prazo px-2 py-0.5 text-[11px] text-prime-azul">
          <Calendar className="w-[11px] h-[11px] shrink-0" />
          {formattedDate}
        </div>
      </div>

      <hr className="border-none border-t border-[#e0e0e0] my-1" />

      <div className="flex items-center justify-between">
        <span className="text-[14px] font-normal text-prime-preto">{task.id}</span>
        <div className="flex items-center gap-2">
          <span className="text-prime-preto-50 flex items-center">
            <ChevronsDown className="w-3.5 h-3.5" />
          </span>
          {firstAssignee && (
            <div className="w-7 h-7 rounded-full bg-prime-azul text-white grid place-items-center text-[11px] font-bold" title={firstAssignee.name}>
              {firstAssignee.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
