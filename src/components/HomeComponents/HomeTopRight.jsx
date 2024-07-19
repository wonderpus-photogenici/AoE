import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import store from '../../redux/store';

const HomeTopRight = () => {
    const navigate = useNavigate();

    const user = useUser();
    const supabase = useSupabaseClient();

    // console.log('store: ', store);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        // console.log('user: ', user);
    }

    useEffect(() => {
        getUser();
        // console.log('store.getState(): ', store.getState());
    }, []);

    async function signOut() {
        const { error } = await supabase.auth.signOut();
    }


    return (
        <div className="HomeTopRightWrapper">
            <div className="HomeTopRightMessagesWrapper">
                <button type="button" className="HomeTopRightMessages" onClick={() => {
                    navigate('/messages')
                }}>Messages</button>
            </div>
            <div className="HomeTopRightLogoutWrapper">
                <button type="button" className="HomeTopRightMessages" onClick={() => {
                    signOut();
                    navigate('/')
                }}>Logout</button>
            </div>
            <div className="HomeTopRightProfileWrapper">
                <button type="button" className="HomeTopRightMessages" onClick={() => {
                    navigate('/profile')
                }}>            
                {user === null ?
                    // If there's not a user logged in:
                    <>
                        None
                    </> : <>
                        {/* If there's a user logged in */}
                        Profile
                        {/* {user.email} */}
                    </>
                }</button>
            </div>
        </div>
    )
}

export default HomeTopRight;