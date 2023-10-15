import React from "react";
import Message from "./message";
import './Styles/chat.css';

const Messages = () => {
    return(
        <div className="messages">
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
        </div>
    )
}

export default Messages