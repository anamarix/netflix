import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import n from "../../images/netflix.png";
import findIcon from "../../images/find.png";

function Navbar(props) {

const searchingHandler =(e) => {
props.setSearchValue(e.target.value);
  }
  return (
    <header>
      <img className="logo-navbar" src={n} alt="logo" />
      <nav>
        <ul>
          <li><Link to="/favorites">My favorites</Link></li>
          <li>
            <input
              type="text"
              placeholder="Search genre, title"
              id="input-search"
              value={props.searchValue}
              className={props.searchInput?"input-visible" : null}
              onChange={(e)=>searchingHandler(e)}
            ></input>
          </li>
          <li id={props.searchInput?"searchIcon searchIcon-checked":"searchIcon"}>
            <img src={findIcon} id="search-icon" alt="find" onClick={() => props.setSearchInput(true)} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
