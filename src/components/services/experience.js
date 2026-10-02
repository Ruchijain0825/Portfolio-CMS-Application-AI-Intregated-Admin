const API_URL = import.meta.env.VITE_BACKEND_URL;


// CREATE EXPERIENCE
export const createExperience = async (data) => {
  const response = await fetch(`${API_URL}/experience`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error(
      `Server returned invalid response. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || `Failed to create experience (${response.status})`
    );
  }

  return result;
};


// GET ALL EXPERIENCES
export const getExperiences = async () => {
  const response = await fetch(`${API_URL}/experience`);

  const text = await response.text();

  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error(
      `Server returned invalid response. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || `Failed to fetch experiences (${response.status})`
    );
  }

  return result;
};


// GET EXPERIENCE BY ID
export const getExperienceById = async (id) => {
  const response = await fetch(`${API_URL}/experience/${id}`);

  const text = await response.text();

  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error(
      `Server returned invalid response. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || `Experience not found (${response.status})`
    );
  }

  return result;
};


// UPDATE EXPERIENCE
export const updateExperience = async (id, data) => {
  const response = await fetch(`${API_URL}/experience/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error(
      `Server returned invalid response. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || `Failed to update experience (${response.status})`
    );
  }

  return result;
};


// DELETE EXPERIENCE
export const deleteExperience = async (id) => {
  const response = await fetch(`${API_URL}/experience/${id}`, {
    method: "DELETE",
  });

  const text = await response.text();

  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error(
      `Server returned invalid response. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || `Failed to delete experience (${response.status})`
    );
  }

  return result;
};