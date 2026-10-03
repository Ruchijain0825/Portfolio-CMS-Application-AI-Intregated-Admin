const API_URL = import.meta.env.VITE_BACKEND_URL;

// Get all recruiter messages
export const getMessages = async () => {
    const response = await fetch(
        `${API_URL}/recruiter-messages`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch messages"
        );
    }

    return data;
};
// Send recruiter message
export const sendMessage = async (messageData) => {
    const response = await fetch(
        `${API_URL}/recruiter-messages`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to send message"
        );
    }

    return data;
};