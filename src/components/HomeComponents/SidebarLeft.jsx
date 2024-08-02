import React from 'react'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDispatch } from 'react-redux';
import ChatBox from '../ChatBox.jsx';

const SideBarLeft = () => {
    const dispatch = useDispatch();

    const user = useUser();

    return (
        <div className="SideBarLeftWrapper">

            {user === null ?
                // If there's not a user logged in:
                <>
                    <p>No user Logged in</p>
                </> : <>
                    {/* If there's a user logged in */}
                    <p style={{ color: "white" }}>Current user: {user.user_metadata.username}</p>
                    {/* <button type="button" 
                    onClick={() => {
                        if (document.getElementById('ChatBoxWrapper').style.display === "none") {
                            document.getElementById('ChatBoxWrapper').style.display = "grid" 
                        } else {
                            document.getElementById('ChatBoxWrapper').style.display = "none"
                        }}}
                    >Test Button to test chat boxes popping up</button> */}
                    {/* <ChatBox /> */}
                </>
            }
        </div>
    )
}

export default SideBarLeft;