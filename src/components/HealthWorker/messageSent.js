import {React, useState} from 'react';

const MessageSent = (props) =>{
    return(
        <div className="sent-box">
            <h4>Notification sent to user: {props.caseID}</h4>
        </div>
    );
}

export default MessageSent;