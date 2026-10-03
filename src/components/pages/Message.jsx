import { useEffect, useState } from "react";
import { getMessages } from "../services/recruiter";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages();
                setMessages(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Messages</h1>

            {messages.map((item) => (
                <div key={item.id}>
                    <h3>{item.sender_name}</h3>
                    <p>{item.sender_email}</p>
                    <h4>{item.subject}</h4>
                    <p>{item.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;