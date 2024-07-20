import React from 'react'
import { useDispatch } from 'react-redux';
import { setFeedData } from '../../redux/feedDataSlice';
import store from '../../redux/store';

const HomeGameSearch = (props) => {
    const { feedData } = props;
    const dispatch = useDispatch();
    // console.log('props: ', props);
    // console.log('feedArray: ', feedArray);
    const myFunction = () => {
        document.getElementById('profGamesDrop2').style.display = 'block';
    };


    // Idk why, but window.onclick isn't working here

    window.onclick = function (event) {
        // console.log('in onclick');
        if (document.getElementById('profGamesDropBtn2') !== null) {
            if (!event.target.matches('#profGamesDropBtn2') && !event.target.matches('#profGamesInput2') && !event.target.matches('#profGamesDrop2')) {
                document.getElementById('profGamesDrop2').style.display = 'none';
            }
        }
    };

    const profGamesFilter = () => {
        var input, filter, adiv, i;
        input = document.getElementById("profGamesInput2");
        filter = input.value.toUpperCase();
        let div = document.getElementById("profGamesDrop2");
        adiv = div.getElementsByTagName("div");
        for (i = 0; i < adiv.length; i++) {
            let txtValue = adiv[i].textContent || adiv[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                adiv[i].style.display = "";
            } else {
                adiv[i].style.display = "none";
            }
        }
    };

    const searchGame = (game) => {  
        document.getElementById('profGamesDrop2').style.display = 'none';
        let feedData2 = [];
        if (feedData) {
            document.getElementById('profGamesDropBtn2').innerHTML = game;
            // console.log('feedData: ', feedData);
            for (let i = 0; i < feedData.length; i++) {
                if (feedData[i].allgames.includes(game)) {
                    feedData2.push(feedData[i]);
                }
            }
            // console.log('feedData2: ', feedData2);
            dispatch(setFeedData(feedData2));
            // console.log('store.getState(): ', store.getState());
        }
    }


    return (
            <div className="allgames">
                <div className="allgamesWrapper">
                    {/* <div>
                        Filter By Game:
                    </div> */}
                    <div className="profGamesDropdown">
                        {/* <button onClick={myFunction} className="profGamesDropdown" id="profGamesDropBtn2">Search Games</button> */}
                        <div id="profGamesDrop2" className="profGamesDrop">
                            <input type="text" placeholder="Search.." id="profGamesInput2" onKeyUp={profGamesFilter}></input>
                            {/* Just hard coding options for now since short on time */}
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                League of Legends
                            </div>
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                Minecraft
                            </div>
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                Valorant
                            </div>
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                Baldur's Gate 3
                            </div>
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                Elden Ring
                            </div>
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                Overwatch
                            </div>
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                Fortnite
                            </div>
                            <div onClick={(e) => {
                                searchGame(e.target.innerHTML);
                            }}>
                                Apex Legends
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default HomeGameSearch;