import React from 'react';

const ProfGamesList = (props) => {
    const { game } = props; 
    // console.log('game: ', game);
    return (
        <div className="ProfGamesList">
            {game}
        </div>
    )
}

export default ProfGamesList;