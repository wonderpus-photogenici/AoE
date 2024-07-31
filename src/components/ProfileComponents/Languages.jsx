import React from 'react';
import LanguagesSingle from './LanguagesSingle.jsx';

const Languages = (props) => {
    const { user, username, languages } = props;

    let availableLanguages = [];

    const profLanguagesFilter = () => {
        if (document.getElementById("profLanguagesInput") && document.getElementById("profLanguagesDrop")) {
            var input, filter, ul, li, adiv, i;
            input = document.getElementById("profLanguagesInput");
            filter = input.value.toUpperCase();
            let div = document.getElementById("profLanguagesDrop");
            adiv = div.getElementsByTagName("div");
            if (adiv.length) {
                for (i = 0; i < adiv.length; i++) {
                    let txtValue = adiv[i].textContent || adiv[i].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        adiv[i].style.display = "";
                    } else {
                        adiv[i].style.display = "none";
                    }
                }
            }
        }
    };

    if (user && username && languages) {


        let languagesArray = ["Mandarin Chinese", "Spanish", "English", "Hindi", "Bengali", "Portuguese", "Russian", "Japanese", "Yue Chinese", "Vietnamese", "Turkish", "Wu Chinese", "Marathi", "Telugu", "Western Punjabi", "Korean", "Tamil", "Egyptian Arabic", "Standard German", "French", "Urdu", "Javanese", "Iranian Persian", "Gujarati", "Hausa", "Bhojpuri", "Levantine Arabic", "Southern Min"];

        for (let i = 0; i < languagesArray.length; i++) {
            if (languages.includes(languagesArray[i])) {
                availableLanguages.push(<LanguagesSingle
                    key={`LanguagesSingle#${i}`}
                    language={languagesArray[i]}
                    speaks={true}
                    i={i}
                />);
            } else {
                availableLanguages.push(<LanguagesSingle
                    key={`LanguagesSingle#${i}`}
                    language={languagesArray[i]}
                    speaks={false}
                    i={i}
                />);
            }
        };
    }

    const myFunction2 = () => {
        document.getElementById('profLanguagesDrop').style.display = 'block';
    };

    if (user && user.user_metadata.username === username) {
        window.onclick = function (event) {
            if (document.getElementById('profileLanguagesInput') !== null && document.getElementById('profLanguagesDrop') !== null) {
                if (!event.target.matches('#profileLanguagesInput') && !event.target.matches('#profLanguagesInput') && !event.target.matches('#profLanguagesDrop')) {
                    document.getElementById('profLanguagesDrop').style.display = 'none';
                }
            }

            if (document.getElementById('gamesplayedListAdd') !== null && document.getElementById('profGamesDrop') !== null) {
                if (!event.target.matches('.gamesplayedListAdd') && !event.target.matches('#gamesplayedListAdd') && !event.target.matches('#profGamesInput') && !event.target.matches('#profGamesDrop') && !event.target.matches('.ProfGamesList')) {
                    document.getElementById('profGamesDrop').style.display = 'none';
                }
            }

            if (document.getElementById('profileLocationInput') !== null && document.getElementById('profLocationsDrop') !== null) {
                if (!event.target.matches('#profileLocationInput') && !event.target.matches('#profLocationsInput') && !event.target.matches('#profLocationsDrop')) {
                    document.getElementById('profLocationsDrop').style.display = 'none';
                }
            }
        };
    }


    if (user && username === user.user_metadata.username && languages) {
        return (
            <div className="languages">
                <div className="h3Mimic">Languages:</div>
                <div className="languagesDropdownWrapper">
                    <input readOnly type="text" name="profileLanguagesInput" id="profileLanguagesInput" className="profileInput noFocusHighlight"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.4)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                        onClick={() => {
                            myFunction2();
                        }} defaultValue={languages.toString().replace(/,/g, ', ')}></input>
                    <div id="profLanguagesDrop" className="profLanguagesDrop">
                        <input type="text" placeholder="Search.." id="profLanguagesInput" onKeyUp={profLanguagesFilter}></input>
                        <div className="profLanguagesDropAvailList">
                            {availableLanguages}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (languages) {
        return (
            <div className="languages">
                <div className="h3Mimic">Languages:</div>
                <div className="languagesDropdownWrapper">
                    <input readOnly type="text" name="profileLanguagesInput" id="profileLanguagesInput" className="profileInput noFocusHighlight"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.4)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                        defaultValue={languages.toString().replace(/,/g, ', ')}></input>
                </div>
            </div>
        )
    } else {
        return (
            <div className="languages">
                <div className="h3Mimic">Languages:</div>
                <div className="languagesDropdownWrapper">
                    <input readOnly type="text" name="profileLanguagesInput" id="profileLanguagesInput" className="profileInput noFocusHighlight"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.4)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                        defaultValue={languages}></input>
                </div>
            </div>
        )
    }
}

export default Languages;