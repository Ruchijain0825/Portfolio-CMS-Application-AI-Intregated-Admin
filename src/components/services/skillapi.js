const API_URL = import.meta.env.VITE_BACKEND_URL;


export const getSkillsApi = async () => {
  const response = await fetch(`${API_URL}/skill`);

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  return await response.json();
};


export const getSkillByIdApi = async (id) => {
  const response = await fetch(`${API_URL}/skill/${id}`);

  if (!response.ok) {
    throw new Error("Skill not found");
  }

  return await response.json();
};


export const createSkillApi = async (skillData) => {
  const response = await fetch(`${API_URL}/skill/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skillData),
  });

  if (!response.ok) {
    throw new Error("Failed to create skill");
  }

  return await response.json();
};


export const updateSkillApi = async (id, skillData) => {
  const response = await fetch(`${API_URL}/skill/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skillData),
  });

  if (!response.ok) {
    throw new Error("Failed to update skill");
  }

  return await response.json();
};


export const deleteSkillApi = async (id) => {
  const response = await fetch(`${API_URL}/skill/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete skill");
  }

  return await response.json();
};