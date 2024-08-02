import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ChatBox = (props) => {
    const [friendPfp, setFriendPfp] = useState('');
    const { messages, friendId, friendUsername, userId, username } = props;

    // When feedData changes, run extractAvailableGames();

    const getFriendPfp = async () => {
        const response = await axios.post('http://localhost:3001/api/getPfpByUserId', {
            userId: friendId,
        });
        console.log('response.data: ', response.data);
        if (response.data) {
            setFriendPfp(response.data);
        }
    };

    if (messages && messages[messages.length - 1] && messages[messages.length - 1].receiver_id === userId) {
        getFriendPfp();
    }

    // console.log('pfp:', pfp);

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
                {/* <button type="button" className="ChatBoxPopupButton"></button> */}
                <div className="ChatBoxPopupWrapper" id="ChatBoxPopupWrapper">
                    <form className="ChatBoxUserInput" id="ChatBoxUserInput">
                        <textarea type="text" className="ChatBoxUserInputReal" />
                        <button type="submit" className="ChatBoxUserSend">Send</button>
                    </form>
                    <div className="ChatBoxPopup" id="ChatBoxPopup">
                        {/* Individual message */}
                        {messages.map((msg, index) => (
                            <div className="chatBoxIndividualMessage" key={'chatBoxIndividualMessage#' + index}>
                                <div className="chatBoxIndividualUserPfp">{msg.sender === username ? <>Y</>: <>N</>}</div>
                                <div className="chatBoxIndividualMessageContent">{msg.message}</div>
                                <div className="chatBoxIndividualTimeStamp">{msg.date_time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
        // messages.map((msg, index) => (

        // ))

        // {console.log('messages in chatbox: ', messages);}

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
                }}>pfp Username</div>
                <div className="ChatBoxWrapperSpan" onClick={() => {
                    document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                    document.getElementById('ChatBoxWrapper').style.display = "none";
                }}>X</div>
                {/* <button type="button" className="ChatBoxPopupButton"></button> */}
                <div className="ChatBoxPopupWrapper" id="ChatBoxPopupWrapper">
                    <form className="ChatBoxUserInput" id="ChatBoxUserInput">
                        <textarea type="text" className="ChatBoxUserInputReal" />
                        <button type="submit" className="ChatBoxUserSend">Send</button>
                    </form>
                    <div className="ChatBoxPopup" id="ChatBoxPopup">
                        {/* put messages here */}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="ChatBoxWrapper" id="ChatBoxWrapper">
            <div className="ChatBoxWrapperGroupMessage" onClick={() => {
                console.log('chatbox click');
                if (document.getElementById('ChatBoxPopupWrapper').style.display === "grid") {
                    document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                } else {
                    document.getElementById('ChatBoxPopupWrapper').style.display = "grid";
                };
            }}>pfp Username</div>
            <div className="ChatBoxWrapperSpan" onClick={() => {
                document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                document.getElementById('ChatBoxWrapper').style.display = "none";
            }}>X</div>
            {/* <button type="button" className="ChatBoxPopupButton"></button> */}
            <div className="ChatBoxPopupWrapper" id="ChatBoxPopupWrapper">
                <form className="ChatBoxUserInput" id="ChatBoxUserInput">
                    <textarea type="text" className="ChatBoxUserInputReal" />
                    <button type="submit" className="ChatBoxUserSend">Send</button>
                </form>
                <div className="ChatBoxPopup" id="ChatBoxPopup">
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp"></div>
                        <div className="chatBoxIndividualMessageContent">This is a short message</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp"></div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp"></div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;