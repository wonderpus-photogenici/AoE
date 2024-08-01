import React from 'react'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDispatch } from 'react-redux';

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
                </>
            }
        </div>
    )
}

export default SideBarLeft;