import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import { getProjects, getProjectById, getCurrentUser } from './services/apiFake';

function App() {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([]);
	const [currentProjectId, setCurrentProjectId] = useState(null);

	useEffect(() => {
		const currentUser = getCurrentUser();
		if (!currentUser) {
			navigate('/login');
			return;
		}
		const userProjects = getProjects(currentUser.id);
		setProjects(userProjects);
		if (userProjects.length > 0) {
			setCurrentProjectId(userProjects[0].id);
		}
	}, [navigate]);

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

