import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
// import store from '../../redux/store';
// import axios from 'axios';
import '../pages/Chat.css'

const MessageTopRight = () => {
  const navigate = useNavigate();

    const user = useUser();
    const supabase = useSupabaseClient();

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
    }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }


  return (
    <div className="HomeTopRightWrapper">
      <div className="HomeTopRightMessagesWrapper">
        <button
          type="button"
          className="MSGTopRightMessages"
          onClick={() => {
            navigate('/home');
          }}
        >
          Home
        </button>
      </div>
      <div className="HomeTopRightLogoutWrapper">
        <button
          type="button"
          className="MSGTopRightMessages"
          onClick={() => {
            signOut();
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
      <div className="HomeTopRightProfileWrapper">
        <button
          type="button"
          className="MSGTopRightMessages"
          onClick={() => {
            window.location.assign(`/profile/${user.user_metadata.username}`)
          }}
        >
          {user === null ? (
            <>None</>
          ) : (
            <>
              Profile
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageTopRight;
