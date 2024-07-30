import React from 'react';
import axios from 'axios';
import { useUser } from "@supabase/auth-helpers-react";
import purpleCheckmark from '../../../dist/src/Assets/purpleCheckmark.png';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/profileSlice';



const GamesSingle = (props) => {
    const { i , game, plays } = props;
    const user = useUser();
    const dispatch = useDispatch();

    const addGame = async (game) => {
        if (user) {
            const response = await axios.post('http://localhost:3001/api/addGame', {
                userId: user.id,
                game: game,
            });
            dispatch(setProfile(response.data));
        }
    };

    const removeGame = async (game) => {
        if (user) {
            const response = await axios.post('http://localhost:3001/api/removeGame', {
                userId: user.id,
                game: game,
            });
            dispatch(setProfile(response.data));
        }
    };

    if (plays === true) {
        return (
            <div className="GamesSingle">
                <span className="playsGameCheck" onClick={() => {
                    removeGame(document.getElementById(`gamesSingle${i}`).innerHTML);
                }}>
                    <img src={purpleCheckmark} alt="" className="playsGameCheckImg"></img>
                </span>
                <div className="gameCheck" id = {`gamesSingle${i}`} onClick={(e) => {
                    removeGame(e.target.innerHTML);
                }}>
                    {game}
                </div>
            </div>
        )
    }
    return (
        <div className="GamesSingle">
            <span className="playsGameCheck" onClick={(e) => {
                addGame(e.target.nextSibling.innerHTML);
            }}>
            </span>
            <div className="gameCheck" onClick={(e) => {
                addGame(e.target.innerHTML);
            }}>
                {game}
            </div>
        </div>
    )
}

export default GamesSingle;