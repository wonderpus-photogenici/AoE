import React from 'react';

const ChatBox = () => {
    var currentdate = new Date();
    var datetime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    return (
        <div className="ChatBoxWrapper" id="ChatBoxWrapper">
            <div className="ChatBoxWrapperGroupMessage" onClick={() => {
                console.log('chatbox click');
                if (document.getElementById('ChatBoxPopupWrapper').style.display === "grid") {
                    document.getElementById('ChatBoxPopupWrapper').style.display = "none";
                } else {
                    document.getElementById('ChatBoxPopupWrapper').style.display = "grid";
                };
            }}>pfp Username, pfp Username,</div>
            <div className="ChatBoxWrapperSpan" onClick={() => {
                document.getElementById('ChatBoxWrapper').style.display = "none";
            }}>X</div>
            {/* <button type="button" className="ChatBoxPopupButton"></button> */}
            <div className="ChatBoxPopupWrapper" id="ChatBoxPopupWrapper">
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
                    {/* <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp">pfp</div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp">pfp</div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp">pfp</div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp">pfp</div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp">pfp</div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp">pfp</div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div>
                    <div className="chatBoxIndividualMessage">
                        <div className="chatBoxIndividualUserPfp">pfp</div>
                        <div className="chatBoxIndividualMessageContent">This is the run on message to test long messages lol, and this one is even longer how does this one look</div>
                        <div className="chatBoxIndividualTimeStamp">{datetime}</div>
                    </div> */}
                    {/* <div>Test Content2</div>
                    <div>Test Content1</div>
                    <div>Test Content2</div>
                    <div>Test Content1</div>
                    <div>Test Content2</div>
                    <div>Test Content1</div>
                    <div>Test Content2</div>
                    <div>Test Content1</div>
                    <div>Test Content2</div>
                    <div>Test Content1</div>
                    <div>Test Content2</div>
                    <div>Test Content1</div>
                    <div>Test Content2</div> */}
                </div>
            </div>
        </div>
    )
}

export default ChatBox;