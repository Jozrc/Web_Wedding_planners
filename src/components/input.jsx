import React from "react";
import Img from "./images/img.png";
import Attach from "./images/attach.png";
import './Styles/chat.css';

const Input = () => {
    return (
        <div className="input">
            <input className="input1" type="text"
             placeholder="Type something..."
            />
            <div className="send">
            <img className="imgInput" src={Attach} alt="" />
            <input className="input1" type="file" style={{dislplay:"none"}} id="file" />
            <label htmlFor="file">
                <img className="imgInput" src={Img} alt="" />
            </label>
            <button className="buttonInput">Send</button>
            </div>
        </div>
    )
}

export default Input