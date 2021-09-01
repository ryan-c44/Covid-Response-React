import React, { Component, useState, useEffect } from 'react';
import './layout.css';
import fire from '../fire';
import Message from './Message';


const Messages = (props) => {

    return(
        <div className="message-container">
             <Message messageText={props.messageArray}/>
        </div>

    );
        
}

export default Messages;