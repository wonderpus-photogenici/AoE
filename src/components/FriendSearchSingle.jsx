import React from 'react'

const FriendSearchSingle = (props) => {
    const { name } = props;
    return (
        <div className="friendSearchSingleWrapper">
            {/* Name: {friendSearchSingleName} */}
            <div onClick={() => {
                // change this to redirect to their profile once we have profiles setup
                document.getElementById('friendsSearchInput').value = name;
            }}>{name}</div>
        </div>
    )
}

export default FriendSearchSingle;