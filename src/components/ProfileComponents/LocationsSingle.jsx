import React from 'react';
import axios from 'axios';
import { useUser } from "@supabase/auth-helpers-react";
// import purpleCheckmark from '../../../dist/src/Assets/purpleCheckmark.png';
import { useDispatch } from 'react-redux';
// import { setProfileLanguages } from '../../redux/profileLanguagesSlice';
import { setProfileLocation } from '../../redux/profileLocationSlice';



const LocationsSingle = (props) => {
    const { i, location, lives } = props;
    const user = useUser();
    const dispatch = useDispatch();

    // console.log('language: ', language);
    // console.log('speaks: ', speaks);

    const updateLocation = async (location) => {
        if (user) {
            console.log('location: ', location);
            const response = await axios.post('http://localhost:3001/api/updateLocation', {
                userId: user.id,
                location: location,
            });
            dispatch(setProfileLocation(response.data));
        }
    };

    if (lives == true) {
        return (
            <div className="LanguagesSingleTrue" onClick={(e) => {
                updateLocation(e.target.innerHTML);
            }}>
                {location}
            </div>
        )
    } else if (lives == false) {
        return (
            <div className="LanguagesSingleFalse" onClick={(e) => {
                updateLocation(e.target.innerHTML);
            }}>
                {location}
            </div>
        )
    }
}

export default LocationsSingle;