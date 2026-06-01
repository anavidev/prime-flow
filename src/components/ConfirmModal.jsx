import React from 'react';

const ConfirmModal = ({ isOpen, title = 'Confirmar', message = '', onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="bg-prime-white rounded-md p-6 z-10 w-[420px] shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-prime-preto-50 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded border border-prime-branco-bord bg-transparent">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white">Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
