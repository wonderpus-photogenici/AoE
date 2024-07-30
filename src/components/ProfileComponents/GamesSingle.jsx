import React from 'react';
import axios from 'axios';
import { useUser } from "@supabase/auth-helpers-react";
import purpleCheckmark from '../../../dist/src/Assets/purpleCheckmark.png';


const GamesSingle = (props) => {
    const { game, plays } = props;
    const user = useUser();

    console.log('plays: ', plays);

    const addGame = async (game) => {
        if (user) {
            const response = await axios.post('http://localhost:3001/api/addGame', {
                userId: user.id,
                game: game,
            });
            if (response.data) {
                document.getElementById("gamesplayedListAdd").innerHTML = response.data;
            }
        }
    };
    if (plays === true) {
        return (
            <div className="GamesSingle" onClick={(e) => {
                addGame(e.target.innerHTML);
            }}>
                <span className="playsGameCheck">
                    <img src={purpleCheckmark} alt="" className="playsGameCheckImg"></img>
                </span>
                <div className="gameCheck">
                    {game}
                </div>
            </div>
        )
    }
    return (
        <div className="GamesSingle" onClick={(e) => {
            addGame(e.target.innerHTML);
        }}>
            <div className="playsGameCheck">
            </div>
            <div className="gameCheck">
                {game}
            </div>
        </div>
    )
}

export default GamesSingle;