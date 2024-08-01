import React from 'react';
import LocationsSingle from './LocationsSingle.jsx';

const Location = (props) => {
    const { location, user, username } = props;
    // console.log('user: ', user);


    let availableLocations = [];
    if (user && username && typeof location === "string") {


        const locationsArray = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

        for (let i = 0; i < locationsArray.length; i++) {
            if (location.includes(locationsArray[i])) {
                availableLocations.push(<LocationsSingle
                    key={`LocationsSingle#${i}`}
                    location={locationsArray[i]}
                    lives={true}
                    i={i}
                />);
            } else {
                availableLocations.push(<LocationsSingle
                    key={`LocationsSingle#${i}`}
                    location={locationsArray[i]}
                    lives={false}
                    i={i}
                />);
            }
        };
    }

    const profLocationsFilter = () => {
        if (document.getElementById("profLocationsInput") && document.getElementById("profLocationsInput")) {
            var input, filter, ul, li, adiv, i;
            input = document.getElementById("profLocationsInput");
            filter = input.value.toUpperCase();
            let div = document.getElementById("profLocationsDrop");
            adiv = div.getElementsByTagName("div");
            for (i = 0; i < adiv.length; i++) {
                let txtValue = adiv[i].textContent || adiv[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    adiv[i].style.display = "";
                } else {
                    adiv[i].style.display = "none";
                }
            }
        }
    };

    const myFunction2 = () => {
        document.getElementById('profLocationsDrop').style.display = 'block';
    };
    if (user && username === user.user_metadata.username && typeof location === "string") {
        return (
            <div className="location">
                <div className="h3Mimic">Location: </div>
                <div className="locationsDropdownWrapper">
                    <input readOnly type="text" name="profileLocationInput" id="profileLocationInput" className="profileInput noFocusHighlight"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.4)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                        onClick={() => {
                            myFunction2();
                        }} defaultValue={location}></input>
                    <div id="profLocationsDrop" className="profLocationsDrop">
                        <input type="text" placeholder="Search.." id="profLocationsInput" onKeyUp={profLocationsFilter}></input>
                        <div className="profLocationsDropAvailList">
                            {availableLocations}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="location">
                <div className="h3Mimic">Location: </div>
                <div className="locationsDropdownWrapper">
                    <input readOnly type="text" name="profileLocationInput" id="profileLocationInput" className="profileInput noFocusHighlight"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.4)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                        defaultValue={location}></input>
                </div>
            </div>
        )
    }
}

export default Location;