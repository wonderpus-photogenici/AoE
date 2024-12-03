import React from 'react';
import axios from 'axios';
import { useUser } from "@supabase/auth-helpers-react";
import purpleCheckmark from '../../../dist/src/Assets/purpleCheckmark.png';
import { useDispatch } from 'react-redux';
import { setProfileLanguages } from '../../redux/profileLanguagesSlice';



const LanguagesSingle = (props) => {
    const { i , language, speaks } = props;
    const user = useUser();
    const dispatch = useDispatch();

    // console.log('language: ', language);
    // console.log('speaks: ', speaks);

    const addLanguage = async (language) => {
        if (user) {
            const response = await axios.post('http://localhost:3001/api/addLanguage', {
                userId: user.id,
                language: language,
            });
            dispatch(setProfileLanguages(response.data));
        }
    };

    const removeLanguage = async (language) => {
        if (user) {
            const response = await axios.post('http://localhost:3001/api/removeLanguage', {
                userId: user.id,
                language: language,
            });
            dispatch(setProfileLanguages(response.data));
        }
    };

    if (speaks == true) {
        return (
            <div className="LanguagesSingleTrue">
                <div onClick={(e) => {
                    removeLanguage(e.target.innerHTML);
                }}>{language}</div>
            </div>
        )
    } else if (speaks == false) {
        return (
            <div className="LanguagesSingleFalse">
                <div onClick={(e) => {
                    addLanguage(e.target.innerHTML);
                }}>{language}</div>

            </div>
        )
    }
}

export default LanguagesSingle;