import React from 'react';
import axios from 'axios';

const Email = (props) => {
    const { username, user, email } = props;

    const saveEmail = async (e) => {
        if (user) {
            const response = await axios.post('/api/saveEmail', {
                email: e.target.value,
                username: user.user_metadata.username,
            })
        }
    };
    return (
        <div className="contactInfo">
            <div className="h3Mimic">Email: </div>
            {user && username === user.user_metadata.username ?
                <>
                    <input type="text" name="profileEmailInput" id="profileEmailInput" className="profileInput" defaultValue={email} style={{border: '1px solid rgba(0, 0, 0, 0.05)'}} onInput={(e) => {
                        saveEmail(e)
                    }
                    }></input>
                </> : <>
                    <input readOnly type="text" name="profileEmailInput" id="profileEmailInput" className="profileInput" defaultValue={email} style={{border: '1px solid rgba(0, 0, 0, 0.05)'}}></input>
                </>
            }
        </div>
    )
}

export default Email;