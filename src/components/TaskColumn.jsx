import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskColumn = ({ id, title, count, tasks, onCardClick, onAddClick, onEditColumn, onDeleteColumn, onDragStart, onDrop, onDragOver }) => {
  return (
    <div 
      className="bg-prime-white border border-prime-branco-bord rounded-col w-[302px] shrink-0 flex flex-col overflow-hidden"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="px-5 pt-4 pb-3.5 border-b border-prime-branco-bord text-[15px] font-bold text-prime-preto flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-[80%]">
          <span className="truncate" title={title}>{title}</span>
          <span className="text-[11px] font-semibold bg-prime-board-bg border border-prime-branco-bord rounded-full px-2 py-[1px] text-prime-preto-50 shrink-0">
            {count}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={onEditColumn} className="w-[20px] h-[20px] rounded-sm bg-transparent border-none cursor-pointer grid place-items-center text-prime-preto-50 hover:text-prime-azul hover:bg-prime-azul-25 transition-colors" title="Renomear Coluna">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDeleteColumn} className="w-[20px] h-[20px] rounded-sm bg-transparent border-none cursor-pointer grid place-items-center text-prime-preto-50 hover:text-[#a00] hover:bg-[#ffe5e5] transition-colors" title="Excluir Coluna">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-3.5 flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-200px)]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onCardClick(task)}
            onDragStart={(e) => onDragStart(e, task.id, id)}
          />
        ))}

        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-1.5 h-10 border-[2.5px] border-dashed border-prime-azul rounded-card bg-transparent text-prime-azul text-[14px] font-medium cursor-pointer w-full transition-colors hover:bg-[rgba(17,111,152,0.06)]"
        >
          <Plus className="w-[15px] h-[15px]" />
          Criar Tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;
