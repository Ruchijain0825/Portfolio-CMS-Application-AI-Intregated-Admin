export const getaboutapi = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/about`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch about");
  }

  return result;
};


export const createaboutapi = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/about`,
    {
      method: "POST",
      credentials: "include",
      body: data,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create about");
  }

  return result;
};


export const updateaboutapi = async (id, data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/about/${id}`,
    {
      method: "PUT",
      credentials: "include",
      body: data,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update about");
  }

  return result;
};