import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import noPfp from '../../Assets/noPfp.png'

const SideBarLeft = () => {
    // Just testing loading an image from the supabase database

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
            {/* <button type="button" onClick={retrieveMyPfp}>Get Image</button> */}
            <img src={`${imgLink}`} alt="" className="testImgLink"></img>

            {/* Testing how to set a default image if a there is not user image */}
            {/* <img src='notgnawork' alt="No Image Found" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = noPfp;
            }} className="testImgLink"></img> */}
        </div>
    )
}

export default SideBarLeft;