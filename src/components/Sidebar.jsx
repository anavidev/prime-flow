import React from 'react';
import { users } from '../dados';
import { LogOut, Settings } from 'lucide-react';

const Sidebar = ({ projects = [], currentProjectId, onSelectProject }) => {
  const currentUser = users[0];
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
          <svg width="44" height="44" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="20" width="250" height="250" rx="32" fill="#14A1DD"/>
            <path d="M206 66H159C150.348 66 143.333 73.0142 143.333 81.6667V128.667C143.333 137.319 150.348 144.333 159 144.333H206C214.652 144.333 221.667 137.319 221.667 128.667V81.6667C221.667 73.0142 214.652 66 206 66Z" fill="#E6E6E6"/>
            <path opacity="0.7" d="M143.333 105.167H135.5C120.726 105.167 113.347 105.167 108.757 109.757C104.167 114.347 104.167 121.726 104.167 136.5V152.167C104.167 166.94 104.167 174.319 108.757 178.91C113.347 183.5 120.726 183.5 135.5 183.5H151.167C165.94 183.5 173.319 183.5 177.91 178.91C182.5 174.319 182.5 166.94 182.5 152.167V144.333H174.667C159.893 144.333 152.514 144.333 147.924 139.743C143.333 135.153 143.333 127.774 143.333 113V105.167Z" fill="#E6E6E6"/>
            <path opacity="0.4" d="M104.167 144.333V152.167C104.167 166.94 104.167 174.319 108.757 178.91C113.347 183.5 120.726 183.5 135.5 183.5H143.333V191.333C143.333 206.107 143.333 213.486 138.743 218.076C134.153 222.667 126.774 222.667 112 222.667H96.3333C81.5597 222.667 74.1807 222.667 69.5903 218.076C65 213.486 65 206.107 65 191.333V175.667C65 160.893 65 153.514 69.5903 148.924C74.1807 144.333 81.5597 144.333 96.3333 144.333H104.167Z" fill="#E6E6E6"/>
          </svg>
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
