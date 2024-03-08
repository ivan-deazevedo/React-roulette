import React from "react";
import "./Header.css";

interface IHeaderProps{

}

const Header: React.FunctionComponent<IHeaderProps> = () => {
    return (
        <header>
            <div>
                <h1>CarSys - resto spinner</h1>
            </div>
        </header>
    );
}

export default Header;
