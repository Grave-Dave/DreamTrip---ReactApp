import React from "react";

function Header() {
    return(
        <div className="header">
            <h1 className="header__title">Dream Trip</h1>
            <div className="header__input">
                <label className="header__input--label" htmlFor="destination">Where do you want to go?</label>
                <input className="header__input--box" type="text" id='destination' placeholder="Type here" />
                <button className="header__input--btn">Explore</button>
            </div>
        </div>
    )
}

export default Header