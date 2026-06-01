import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import TaskCard from './TaskCard';
import ConfirmModal from './ConfirmModal';
import { getColumnsData, saveTask, deleteTask, createColumn, updateColumn, deleteColumn, moveTask } from '../services/apiFake';

const Board = ({ currentProjectId }) => {
  const [columnsData, setColumnsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [dragOrigin, setDragOrigin] = useState(null);
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [pendingDeleteColumnId, setPendingDeleteColumnId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const loadData = () => {
    if (currentProjectId) {
      setColumnsData(getColumnsData(currentProjectId));
    }
  };

  useEffect(() => {
    loadData();
  }, [currentProjectId]);

  const findColumnByTaskId = (taskId, data = columnsData) => {
    return data.find(col => col.tasks.some(task => task.id === taskId)) || null;
  };

  const findTaskById = (taskId, data = columnsData) => {
    for (const col of data) {
      const task = col.tasks.find(item => item.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const getTaskPosition = (taskId, data = columnsData) => {
    for (const col of data) {
      const index = col.tasks.findIndex(item => item.id === taskId);
      if (index !== -1) {
        return { columnId: col.id, index };
      }
    }
    return null;
  };

  const reorderWithinColumn = (data, columnId, activeId, overId) => {
    const column = data.find(col => col.id === columnId);
    if (!column) return data;

    const oldIndex = column.tasks.findIndex(task => task.id === activeId);
    const newIndex = column.tasks.findIndex(task => task.id === overId);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
      return data;
    }

    const reorderedTasks = arrayMove(column.tasks, oldIndex, newIndex);
    return data.map(col => (
      col.id === columnId
        ? { ...col, tasks: reorderedTasks }
        : col
    ));
  };

  const moveAcrossColumnsPreview = (data, activeTaskIdValue, overId) => {
    const sourceColumn = findColumnByTaskId(activeTaskIdValue, data);
    if (!sourceColumn) return data;

    const overIsColumn = data.some(col => col.id === overId);
    const destinationColumn = overIsColumn
      ? data.find(col => col.id === overId)
      : findColumnByTaskId(overId, data);

    if (!destinationColumn || sourceColumn.id === destinationColumn.id) {
      return data;
    }

    const sourceTasks = [...sourceColumn.tasks];
    const sourceTaskIndex = sourceTasks.findIndex(task => task.id === activeTaskIdValue);
    if (sourceTaskIndex === -1) return data;

    const [movedTask] = sourceTasks.splice(sourceTaskIndex, 1);
    const destinationTasks = [...destinationColumn.tasks];
    destinationTasks.splice(destinationTasks.length, 0, movedTask);

    return data.map(col => {
      if (col.id === sourceColumn.id) {
        return { ...col, tasks: sourceTasks };
      }
      if (col.id === destinationColumn.id) {
        return { ...col, tasks: destinationTasks };
      }
      return col;
    });
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddCard = (columnId) => {
    setSelectedTask({ projectId: currentProjectId, columnId, title: '', description: '', tags: [], assignees: [], priority: '' });
    setIsModalOpen(true);
  };

  const handleSave = (task) => {
    saveTask(task);
    loadData();
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteTask(id);
    loadData();
    setIsModalOpen(false);
  };

  const handleAddColumn = () => {
    if (!currentProjectId) return;
    const newCol = createColumn('', currentProjectId);
    loadData();
    setEditingColumnId(newCol.id);
  };

  const handleEditColumn = (colId, currentTitle) => {
    setEditingColumnId(colId);
  };

  const requestDeleteColumn = (colId) => {
    setPendingDeleteColumnId(colId);
  };

  const confirmDeleteColumn = () => {
    if (!pendingDeleteColumnId) return;
    deleteColumn(pendingDeleteColumnId);
    loadData();
    setPendingDeleteColumnId(null);
  };

  const cancelDeleteColumn = () => {
    setPendingDeleteColumnId(null);
  };

  const handleRenameColumn = (colId, newTitle) => {
    if (!newTitle || !newTitle.trim()) {
      const col = columnsData.find(c => c.id === colId);
      if (col && (!col.title || col.title === '')) {
        deleteColumn(colId);
        loadData();
        setEditingColumnId(null);
        return;
      }
      return;
    }
    updateColumn(colId, newTitle.trim());
    loadData();
    setEditingColumnId(null);
  };

  const handleDragStart = (event) => {
    const sourcePosition = getTaskPosition(event.active.id);
    setDragOrigin(sourcePosition);
    setActiveTaskId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setColumnsData(prev => moveAcrossColumnsPreview(prev, active.id, over.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTaskId(null);
    const sourcePosition = dragOrigin;
    setDragOrigin(null);

    if (!over) {
      loadData();
      return;
    }

    if (!sourcePosition) {
      loadData();
      return;
    }

    const overIsColumn = columnsData.some(col => col.id === over.id);
    const destinationColumn = overIsColumn
      ? columnsData.find(col => col.id === over.id)
      : findColumnByTaskId(over.id);

    if (!destinationColumn) {
      loadData();
      return;
    }

    let nextData = columnsData;

    if (!overIsColumn && sourcePosition.columnId === destinationColumn.id) {
      nextData = reorderWithinColumn(columnsData, sourcePosition.columnId, active.id, over.id);
    }

    setColumnsData(nextData);

    const finalPosition = getTaskPosition(active.id, nextData);
    if (!finalPosition) {
      loadData();
      return;
    }

    moveTask(active.id, sourcePosition.columnId, finalPosition.columnId, finalPosition.index);
    loadData();
  };

  const handleDragCancel = () => {
    setActiveTaskId(null);
    setDragOrigin(null);
    loadData();
  };

  const activeTask = activeTaskId ? findTaskById(activeTaskId) : null;

  return (
    <div className="flex-1 overflow-auto bg-prime-board-bg px-7 py-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex gap-5 items-start min-h-full">
          {columnsData.map((col) => (
            <TaskColumn
              key={col.id}
              id={col.id}
              title={col.title}
              count={col.tasks.length}
              tasks={col.tasks}
              activeTaskId={activeTaskId}
              onCardClick={handleCardClick}
              onAddClick={() => handleAddCard(col.id)}
              onEditColumn={() => handleEditColumn(col.id, col.title)}
              onDeleteColumn={() => requestDeleteColumn(col.id)}
              editingColumnId={editingColumnId}
              onRenameColumn={handleRenameColumn}
            />
          ))}

          <button
            onClick={handleAddColumn}
            className="w-[52px] h-[52px] rounded-full border-2 border-prime-branco-bord bg-prime-white text-prime-preto-50 grid place-items-center cursor-pointer shrink-0 self-start mt-1 transition-colors hover:border-prime-azul hover:text-prime-azul"
            title="Adicionar coluna"
          >
            <Plus className="w-[22px] h-[22px]" />
          </button>
        </div>

        <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
          {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <ConfirmModal
        isOpen={!!pendingDeleteColumnId}
        title="Excluir coluna"
        message="Tem certeza que deseja excluir esta coluna? Todas as tarefas nela serão apagadas."
        onConfirm={confirmDeleteColumn}
        onCancel={cancelDeleteColumn}
      />
    </div>
  );
};

export default Board;

