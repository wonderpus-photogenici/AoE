import React from 'react';

const Location = () => {
    return (
        <div className="location">
            <div class="h3Mimic">Location: </div>
            <input type="text" name="profileLocationInput" id="profileLocationInput" className="profileInput" style={{border: '1px solid rgba(0, 0, 0, 0.05)'}} defaultValue={'temp'}></input>
        </div>
    )
}

export default Location;