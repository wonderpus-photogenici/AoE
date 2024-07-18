import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import noPfp from '../../Assets/noPfp.png'

import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux'
import { useSelector } from 'react-redux'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const SideBarLeft = () => {
    // Just testing loading an image from the supabase database

    // const user = useUser();
    // const supabase = useSupabaseClient();
    // console.log('user: ', user);

    // const { store } = useContext(ReactReduxContext);
    // console.log('store: ', store);

    // const store = useSelector((state => state.supabaseUser));
    // console.log('store: ', store);

    const [imgLink, setImgLink] = useState([]);

    const character = async () => {
        let result = await axios.post('http://localhost:3001/api/getMyPfp');
        setImgLink(result.data);
    };


    useEffect(() => {
        character()
    }, []);

    return (
        <div className="SideBarLeftWrapper">
            {/* Loading image from database table */}
            {/* <img src={`${imgLink}`} alt="" className="testImgLink"></img> */}

            {/* <p style={{ color: "white" }}>Current user: {user.email}</p> */}

            <img src={`${imgLink}`} alt="No Image Found" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = noPfp;
            }} className="testImgLink"></img>

            {/* loading image from url from database table */}
            {/* <img src={`https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/ad71ba30-2c74-4333-8ad6-032295731ab0/5933eb11-6e89-48e3-a818-2cea57c0fbbc`} alt="" className="testImgLink"></img> */}

            {/* Testing how to set a default image if a there is not user image */}
            {/* <img src='notgnawork' alt="No Image Found" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = noPfp;
            }} className="testImgLink"></img> */}
        </div>
    )
}

export default SideBarLeft;