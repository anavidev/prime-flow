import React from 'react';
import { Search, SlidersHorizontal, Settings2 } from 'lucide-react';

const Header = ({ currentProject }) => {
  const projectName = currentProject?.name || 'Selecione um projeto';
  
  return (
    <header className="px-7 pt-5 pb-[18px] bg-prime-white border-b border-prime-branco-bord flex items-end justify-between gap-5 shrink-0">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-prime-preto-50 mb-1">
          Projeto / <strong className="font-bold text-prime-preto">{projectName}</strong>
        </div>
        <h1 className="text-[24px] font-semibold text-prime-preto leading-[1.2]">
          Projeto: {projectName}
        </h1>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2 border-2 border-prime-branco-bord rounded-search px-3 h-9 w-[240px] bg-prime-white">
          <Search className="w-3.5 h-3.5 text-prime-branco-bord shrink-0" />
          <input
            type="text"
            placeholder="Pesquisar"
            className="border-none bg-transparent outline-none font-sans text-[14px] font-medium text-prime-preto w-full placeholder:text-prime-branco-bord"
          />
        </div>
        <button className="w-[34px] h-[34px] rounded-full border-2 border-prime-branco-bord grid place-items-center cursor-pointer text-prime-preto-50 bg-transparent hover:text-prime-preto transition-colors" title="Filtrar">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        <button className="w-[34px] h-[34px] rounded-full border-2 border-prime-branco-bord grid place-items-center cursor-pointer text-prime-preto-50 bg-transparent hover:text-prime-preto transition-colors" title="Tema">
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
