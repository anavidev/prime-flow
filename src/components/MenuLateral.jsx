// src/components/Botao.jsx
import { useState } from 'react';
import UsuarioPerfilMenu from './UsuarioPerfilMenu';

const menuItens = [
	{ id: 1, nome: 'Tarefas', href: '/tarefas' },
	{ id: 2, nome: 'Sobre', href: '/sobre' },
	{ id: 3, nome: 'Contato', href: '/contato' },
];

export default function MenuLateral() {

  return (
		<aside className="bg-gray-800 text-white p-4 w-64 h-screen flex flex-col gap-5">
			<UsuarioPerfilMenu />
			<nav className="mb-4">
				<h2 className="text-xl font-bold mb-4">Menu Lateral</h2>
				<ul>
					{menuItens.map((item) => (
						<li key={item.id} className="hover:bg-gray-700 p-2 rounded cursor-pointer">
							<a href={item.href}>{item.nome}</a>
						</li>
					))}
				</ul>
			</nav>
		</aside>
  );
}