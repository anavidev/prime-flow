import { useState } from 'react';

export default function UsuarioPerfilMenu() {
	return (
		<div className="flex items-center space-x-4">
			<img
				src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${Math.random()}`}
				alt="Avatar do Usuário"
				className="w-10 h-10 rounded-full bg-gray-200"
			/>
			<div>
				<p className="text-sm font-medium text-gray-900">Usuário</p>
				<p className="text-xs text-gray-500">user@example.com</p>
			</div>
		</div>
	);
}