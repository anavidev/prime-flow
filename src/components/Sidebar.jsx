import React from 'react';
import { getCurrentUser } from '../services/apiFake';
import { LogOut, Settings } from 'lucide-react';

const Sidebar = ({ projects = [], currentProjectId, onSelectProject }) => {
  const currentUser = getCurrentUser();
  const initials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'X';

  return (
    <aside className="w-sidebar min-h-screen bg-prime-white border-r border-prime-branco-bord flex flex-col shrink-0 sticky top-0 h-screen">
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-5 border-b border-prime-branco-bord">
        <div className="w-11 h-11 shrink-0 grid place-items-center">
          <img src="/logo.svg" alt="PrimeFlow Logo" className="w-[44px] h-[44px]" />
        </div>
        <span className="text-[20px] font-bold text-prime-preto">PrimeFlow</span>
      </div>

      <div className="flex items-center gap-2.5 py-3.5 px-5 border-b border-prime-branco-bord">
        <div className="w-9 h-9 rounded-full bg-prime-azul text-white grid place-items-center text-[13px] font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-prime-preto leading-[1.3]">{currentUser?.name ?? 'Usuário'}</div>
          <div className="text-[11px] text-prime-preto-50 mt-[1px]">{currentUser?.role ?? 'Cargo'}</div>
        </div>
        <button className="w-7 h-7 rounded-md border-none bg-transparent grid place-items-center cursor-pointer text-prime-preto-50 hover:text-prime-preto hover:bg-prime-branco-bord transition-colors" title="Sair">
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      <div className="px-3 pt-4">
        <div className="text-[13px] text-prime-preto px-2 mb-1.5">Meus <strong>Projetos</strong></div>
        {projects.map(proj => (
          <div
            key={proj.id}
            onClick={() => onSelectProject && onSelectProject(proj.id)}
            className={`flex items-center gap-2.5 px-2 h-10 rounded-proj text-[14px] font-bold text-prime-preto cursor-pointer select-none transition-colors ${
              proj.id === currentProjectId ? 'bg-[rgba(217,217,217,0.30)]' : 'hover:bg-[rgba(217,217,217,0.15)]'
            }`}
          >
            <div className="w-[22px] h-[22px] rounded md bg-gray-500 shrink-0"></div>
            {proj.name}
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-prime-branco-bord py-3.5 px-5 flex items-center gap-2 text-prime-preto-50 text-[13px] cursor-pointer hover:text-prime-preto transition-colors">
        <Settings className="w-[18px] h-[18px]" />
        Configurações
      </div>
    </aside>
  );
};

export default Sidebar;
