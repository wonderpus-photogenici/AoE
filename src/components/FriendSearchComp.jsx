import React from 'react'
import FriendSearchSingle from './FriendSearchSingle.jsx';

const FriendSearchComp = (props) => {
    const { friendSearchResults } = props;
    // console.log('friendSearchResults: ', friendSearchResults);
    let friendsArray = [];
    if (friendSearchResults.length !== 0) {
        for (let i = 0; i < friendSearchResults.length; i++) {
            friendsArray.push(<FriendSearchSingle 
                key = {`FriendSearchSingle#${i}`}
                name = {friendSearchResults[i]}
            />)
        }
        return (
            <div id="friendsDropDown" className="dropdown-content">
                {friendsArray}
            </div>
        )
    } else {
        return (
            <div id="friendsDropDown" className="dropdown-content">
            </div>
        )
    }
}

export default FriendSearchComp;