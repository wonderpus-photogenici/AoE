import React from 'react'

const FriendSearchSingle = (props) => {
    const { name, pfp } = props;
    const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";
    return (
        <div className="friendSearchSingleWrapper" onClick={() => {
            // change this to redirect to their profile once we have profiles setup
            document.getElementById('friendsSearchInput').value = name;
        }}>
            {/* <div className="friendSearchPfpWrapper">
                pfp
            </div> */}
            <img className="friendSearchPfpWrapper" src={CDNURL + pfp} alt="profile pic" />
            <div className="friendSearchSingleName">{name}</div>
        </div>
    )
}

export default FriendSearchSingle;