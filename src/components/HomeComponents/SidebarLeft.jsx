import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import noPfp from '../../Assets/noPfp.png'

import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux'
import { useSelector } from 'react-redux'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { setUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import store from '../../redux/store';
// import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const SideBarLeft = () => {
    const dispatch = useDispatch();

    // const { store } = useContext(ReactReduxContext);
    // console.log('store: ', store);

    // const store = useSelector((state => state.supabaseUser));
    // console.log('store: ', store);

    const user = useUser();
    const supabase = useSupabaseClient();

    const [imgLink, setImgLink] = useState([]);

    return (
        <div className="SideBarLeftWrapper">

            {user === null ?
                // If there's not a user logged in:
                <>
                    <p>No user Logged in</p>
                </> : <>
                    {/* If there's a user logged in */}
                    <p style={{ color: "white" }}>Current user: {user.user_metadata.username}</p>
                    {/* <button type="Button" onClick = {() => {
                        console.log(store.getState().feedData.feedData);
                        // console.log(useSelector((state) => state.feedData));
                    }}>store.getState().feedData.feedData</button> */}
                </>
            }
        </div>
    )
}

export default SideBarLeft;