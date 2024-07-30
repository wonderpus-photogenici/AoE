import React from 'react';

const Languages = () => {
    return (
        <div className="languages">
            <div className="h3Mimic">Languages:</div>
            <input type="text" name="profileLanguagesInput" id="profileLanguagesInput" className="profileInput"
            style={{border: '1px solid rgba(255, 255, 255, 0.4)', borderTop: 'none', borderLeft: 'none', borderRight: 'none'}}
            defaultValue={"temp"}></input>
        </div>
    )
}

export default Languages;