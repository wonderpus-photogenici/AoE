import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyPfp } from '../../backend/controllers/userController';

const ChatBox = (props) => {
    const [friendPfp, setFriendPfp] = useState('');
    const { messages, friendId, friendUsername, userId, username } = props;

    // When feedData changes, run extractAvailableGames();

    const getFriendPfp = async () => {
        const response = await axios.post('http://localhost:3001/api/getPfpByUserId', {
            userId: friendId,
        });
        if (response.data) {
            setFriendPfp(response.data);
        }
    };

    if (messages && messages[messages.length - 1] && messages[messages.length - 1].receiver_id === userId) {
        getFriendPfp();
    }

    console.log('messages in chatbox: ', messages);


    var currentdate = new Date();
    var datetime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    if (messages) {
        const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";

        return (
            <div className="ChatBoxWrapper" id="ChatBoxWrapper">
                <div className="ChatBoxWrapperGroupMessage" onClick={() => {
                    console.log('chatbox click');
                    if (document.getElementById('ChatBoxPopupWrapper').style.display === "grid") {
                        document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                    } else {
                        document.getElementById('ChatBoxPopupWrapper').style.display = "grid";
                    };
                }}><img className="popupFriendPfp" src={CDNURL + friendPfp} alt="" /> {messages.length !== 0 ? <>{messages[messages.length - 1].sender}</> : <></>}</div>
                <div className="ChatBoxWrapperSpan" onClick={() => {
                    document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                    document.getElementById('ChatBoxWrapper').style.display = "none";
                }}>X</div>
                <div className="ChatBoxPopupWrapper" id="ChatBoxPopupWrapper">
                    <form className="ChatBoxUserInput" id="ChatBoxUserInput">
                        <textarea type="text" className="ChatBoxUserInputReal" />
                        <button type="submit" className="ChatBoxUserSend">Send</button>
                    </form>
                    <div className="ChatBoxPopup" id="ChatBoxPopup">
                        {/* Individual messages */}
                        {messages.map((msg, index) => (
                            <div className="chatBoxIndividualMessage" key={'chatBoxIndividualMessage#' + index}>
                                    {/* <img className="chatBoxIndividualUserPfp" src={CDNURL + friendPfp} alt="" /> */}
                                <div className="chatBoxIndividualMessageContent">{msg.message}</div>
                                <div className="chatBoxIndividualTimeStamp">{msg.date_time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )

    } else {
        return (
            <div className="ChatBoxWrapper" id="ChatBoxWrapper">
                <div className="ChatBoxWrapperGroupMessage" onClick={() => {
                    console.log('chatbox click');
                    if (document.getElementById('ChatBoxPopupWrapper').style.display === "grid") {
                        document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                    } else {
                        document.getElementById('ChatBoxPopupWrapper').style.display = "grid";
                    };
                }}></div>
                <div className="ChatBoxWrapperSpan" onClick={() => {
                    document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                    document.getElementById('ChatBoxWrapper').style.display = "none";
                }}>X</div>

                <div className="ChatBoxPopupWrapper" id="ChatBoxPopupWrapper">
                    <form className="ChatBoxUserInput" id="ChatBoxUserInput">
                        <textarea type="text" className="ChatBoxUserInputReal" />
                        <button type="submit" className="ChatBoxUserSend">Send</button>
                    </form>
                    <div className="ChatBoxPopup" id="ChatBoxPopup">

                    </div>
                </div>
            </div>
        )
    }
}

export default ChatBox;