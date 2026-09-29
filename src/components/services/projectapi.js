const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createProject = async (data) => {
  const response = await fetch(`${API_URL}/project/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/project/`);

  return await response.json();
};

export const getProjectById = async (id) => {
  const response = await fetch(`${API_URL}/project/${id}`);

  return await response.json();
};

export const updateProject = async (id, data) => {
  const response = await fetch(`${API_URL}/project/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/project/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};

export const searchProjects = async (search, page = 1, limit = 10) => {
  const response = await fetch(
    `${API_URL}/project/search?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
  );

  return await response.json();
};