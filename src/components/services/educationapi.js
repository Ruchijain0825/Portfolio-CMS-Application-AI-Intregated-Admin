const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log("API URL:", API_URL);


// CREATE EDUCATION
export const createEducation = async (data) => {
  const response = await fetch(
    `${API_URL}/education`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create education");
  }

  return result;
};


// GET ALL EDUCATION
export const getEducations = async () => {
  const response = await fetch(
    `${API_URL}/education`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch education");
  }

  return result;
};


// GET EDUCATION BY ID
export const getEducationById = async (id) => {
  const response = await fetch(
    `${API_URL}/education/${id}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Education not found");
  }

  return result;
};


// UPDATE EDUCATION
export const updateEducation = async (id, data) => {
  const response = await fetch(
    `${API_URL}/education/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update education");
  }

  return result;
};


// DELETE EDUCATION
export const deleteEducation = async (id) => {
  const response = await fetch(
    `${API_URL}/education/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete education");
  }

  return result;
};