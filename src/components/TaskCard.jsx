import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, ChevronsDown } from 'lucide-react';
import { getUsers } from '../services/apiFake';

const TaskCardContent = ({ task }) => {
  const users = getUsers();
  const firstAssignee = task.assignees?.length > 0
    ? users.find(u => u.id === task.assignees[0])
    : null;

  const formattedDate = task.endDate
    ? (() => {
        try {
          const parts = task.endDate.split('-'); // YYYY-MM-DD
          if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        } catch (e) {}
        return task.endDate;
      })()
    : 'DD/MM/AAAA';

  return (
    <>
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
    </>
  );
};

const TaskCard = ({ task, onClick, isOverlay = false, isActive = false }) => {
  if (isOverlay) {
    return (
      <div className="bg-prime-card-bg rounded-card p-4 pb-3.5 flex flex-col gap-2 shadow-[0_12px_28px_rgba(0,0,0,0.18)] rotate-[1deg]">
        <TaskCardContent task={task} />
      </div>
    );
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-prime-card-bg rounded-card p-4 pb-3.5 flex flex-col gap-2 cursor-pointer transition-[box-shadow,transform,opacity] duration-200 hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] ${
        isDragging ? 'opacity-30 scale-[0.98]' : 'opacity-100'
      } cursor-grab active:cursor-grabbing ${isActive && !isDragging ? 'ring-2 ring-prime-azul/20' : ''}`}
      onClick={!isDragging ? onClick : undefined}
    >
      <TaskCardContent task={task} />
    </div>
  );
};

export default TaskCard;
