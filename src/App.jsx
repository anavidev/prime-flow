import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import { getProjects, getProjectById, getCurrentUser } from './services/apiFake';

function App() {
	const [projects, setProjects] = useState([]);
	const [currentProjectId, setCurrentProjectId] = useState(null);

	useEffect(() => {
		const currentUser = getCurrentUser();
		const userProjects = getProjects(currentUser?.id);
		setProjects(userProjects);
		if (userProjects.length > 0) {
			setCurrentProjectId(userProjects[0].id);
		}
	}, []);

	const currentProject = currentProjectId ? getProjectById(currentProjectId) : null;

	return (
		<div className="flex w-full min-h-screen">
			<Sidebar
				projects={projects}
				currentProjectId={currentProjectId}
				onSelectProject={setCurrentProjectId}
			/>
			<main className="flex-1 min-w-0 w-full flex flex-col overflow-hidden">
				{currentProject && <Header currentProject={currentProject} />}
				{currentProjectId && <Board currentProjectId={currentProjectId} />}
			</main>
		</div>
	);
}

export default App;

