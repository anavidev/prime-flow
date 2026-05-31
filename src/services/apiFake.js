import { users as initialUsers, tasks as initialTasks, columns as initialColumns, projects as initialProjects } from '../dados';

const loadFromStorage = (key, defaultData) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Merge missing items so new test projects/tasks load properly
      const parsedIds = new Set(parsed.map(i => i.id));
      const missing = defaultData.filter(d => !parsedIds.has(d.id));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        localStorage.setItem(key, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch (e) {
      console.error('Error parsing localStorage for', key, e);
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultData));
  return [...defaultData];
};

let tasks = loadFromStorage('primeflow_tasks', initialTasks);
let columns = loadFromStorage('primeflow_columns', initialColumns);
let projects = loadFromStorage('primeflow_projects', initialProjects);
let users = loadFromStorage('primeflow_users', initialUsers);

const saveToStorage = () => {
  localStorage.setItem('primeflow_tasks', JSON.stringify(tasks));
  localStorage.setItem('primeflow_columns', JSON.stringify(columns));
  localStorage.setItem('primeflow_projects', JSON.stringify(projects));
  localStorage.setItem('primeflow_users', JSON.stringify(users));
};

export const getCurrentUser = () => {
  const storedUserId = localStorage.getItem('primeflow_current_user');
  if (storedUserId) {
    return users.find(u => u.id === storedUserId) || null;
  }
  return null; // Return null if not logged in
};

export const login = (emailOrUsername, password) => {
  const user = users.find(
    u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
  );
  if (user) {
    localStorage.setItem('primeflow_current_user', user.id);
    return { success: true, user };
  }
  return { success: false, message: 'Usuário ou senha incorretos' };
};

export const register = (userData) => {
  const existingUser = users.find(u => u.email === userData.email || u.username === userData.username);
  if (existingUser) {
    return { success: false, message: 'E-mail ou usuário já cadastrado' };
  }

  const newUser = {
    id: `usr-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);

  // Create a default project for the new user
  const newProject = {
    id: `proj-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    name: 'Meu Primeiro Projeto',
    description: 'Projeto padrão',
    ownerId: newUser.id,
    members: [newUser.id],
    columns: [],
    createdAt: new Date().toISOString(),
    status: 'active'
  };
  projects.push(newProject);

  // Create default columns
  const colA = { id: `col-${Math.floor(Math.random() * 10000)}`, projectId: newProject.id, title: 'A Fazer', taskIds: [], createdAt: new Date().toISOString() };
  const colB = { id: `col-${Math.floor(Math.random() * 10000)}`, projectId: newProject.id, title: 'Em Andamento', taskIds: [], createdAt: new Date().toISOString() };
  const colC = { id: `col-${Math.floor(Math.random() * 10000)}`, projectId: newProject.id, title: 'Concluído', taskIds: [], createdAt: new Date().toISOString() };

  newProject.columns = [colA.id, colB.id, colC.id];
  columns.push(colA, colB, colC);

  saveToStorage();

  localStorage.setItem('primeflow_current_user', newUser.id);
  return { success: true, user: newUser };
};

export const logout = () => {
  localStorage.removeItem('primeflow_current_user');
};

export const getProjects = (userId) => {
  if (userId) {
    return projects.filter(p => p.ownerId === userId || p.members.includes(userId));
  }
  return projects;
};

export const getProjectById = (projectId) => {
  return projects.find(p => p.id === projectId);
};

export const getColumnsData = (projectId) => {
  const projectColumns = columns.filter(col => col.projectId === projectId);
  return projectColumns.map(col => ({
    ...col,
    tasks: col.taskIds.map(taskId => tasks.find(t => t.id === taskId)).filter(Boolean)
  }));
};

export const saveTask = (task) => {
  if (task.id) {
    // Update existing
    tasks = tasks.map(t => t.id === task.id ? task : t);
  } else {
    // Create new
    // Formato sugerido: 3 Letras, traço, 4 números aleatórios (Ex: TSK-0123)
    const randomLetters = String.fromCharCode(
      65 + Math.floor(Math.random() * 26),
      65 + Math.floor(Math.random() * 26),
      65 + Math.floor(Math.random() * 26)
    );
    const randomNumbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    const newTask = {
      ...task,
      id: `${randomLetters}-${randomNumbers}`,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);

    // Add to column
    const colId = task.columnId;
    const col = columns.find(c => c.id === colId);
    if (col) {
      col.taskIds.push(newTask.id);
    }
    saveToStorage();
    return newTask;
  }
  saveToStorage();
  return task;
};

export const deleteTask = (taskId) => {
  tasks = tasks.filter(t => t.id !== taskId);
  columns.forEach(col => {
    col.taskIds = col.taskIds.filter(id => id !== taskId);
  });
  saveToStorage();
};

export const createColumn = (title, projectId) => {
  const newCol = {
    id: `col-${Math.floor(Math.random() * 10000)}`,
    projectId,
    title,
    taskIds: [],
    createdAt: new Date().toISOString()
  };
  columns.push(newCol);
  saveToStorage();
  return newCol;
};

export const updateColumn = (columnId, newTitle) => {
  columns = columns.map(c => c.id === columnId ? { ...c, title: newTitle } : c);
  saveToStorage();
};

export const moveTask = (taskId, sourceColumnId, destColumnId) => {
  if (sourceColumnId === destColumnId) return;

  const sourceCol = columns.find(c => c.id === sourceColumnId);
  const destCol = columns.find(c => c.id === destColumnId);
  const task = tasks.find(t => t.id === taskId);

  if (sourceCol && destCol && task) {
    // Remove from source col
    sourceCol.taskIds = sourceCol.taskIds.filter(id => id !== taskId);
    // Add to dest col
    destCol.taskIds.push(taskId);
    // Update task's columnId
    task.columnId = destColumnId;

    saveToStorage();
  }
};

export const deleteColumn = (columnId) => {
  const col = columns.find(c => c.id === columnId);
  if (col) {
    // Delete all tasks inside this column
    tasks = tasks.filter(t => !col.taskIds.includes(t.id));
    // Remove the column
    columns = columns.filter(c => c.id !== columnId);
    saveToStorage();
  }
};

