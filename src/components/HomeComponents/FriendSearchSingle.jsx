import React from 'react'

const FriendSearchSingle = (props) => {
    const { name } = props;
    return (
        <div className="friendSearchSingleWrapper" onClick={() => {
            // change this to redirect to their profile once we have profiles setup
            document.getElementById('friendsSearchInput').value = name;
        }}>
            <div className="friendSearchPfpWrapper">
                pfp
            </div>
            <div className="friendSearchSingleName">{name}</div>
        </div>
    )
}

export default FriendSearchSingle;