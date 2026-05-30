import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import { getProjects, getProjectById } from './services/apiFake';

function App() {
	const [projects, setProjects] = useState([]);
	const [currentProjectId, setCurrentProjectId] = useState('proj-001');

	useEffect(() => {
		setProjects(getProjects());
	}, []);

	const currentProject = getProjectById(currentProjectId);

	return (
		<div className="flex w-full min-h-screen">
			<Sidebar
				projects={projects}
				currentProjectId={currentProjectId}
				onSelectProject={setCurrentProjectId}
			/>
			<main className="flex-1 min-w-0 w-full flex flex-col overflow-hidden">
				<Header currentProject={currentProject} />
				<Board currentProjectId={currentProjectId} />
			</main>
		</div>
	);
}

export default App;

