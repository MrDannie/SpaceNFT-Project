import "./Nav.css";
import logo from "../../assets/shared/logo.svg";
import hamburger_open from "../../assets/shared/icon-hamburger.svg";
import hamburger_close from "../../assets/shared/icon-close.svg";
import { connectWallet, isWalletConnected } from "../../Adulam";
import {
  setAlert,
  setGlobalState,
  useGlobalState,
  truncate,
} from "../../store/index";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const hamburger = document.getElementById("hamburger");
const hamburgerClose = document.getElementById("hamburger-close");
const menu = document.getElementById("menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("show");
    menu.classList.toggle("show");
  });

  hamburgerClose.addEventListener("click", () => {
    hamburgerClose.classList.toggle("show");
    hamburger.classList.toggle("show");
    menu.classList.toggle("show");
  });
}

const Nav = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  useEffect(() => {
    isWalletConnected().then(() => console.log("Blockchain Loaded"));
  });

  return (
    <nav>
      <div className="nav-container">
        <div className="flex-box nav-flex">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <button className="hamburger" id="hamburger">
            <img className="open" src={hamburger_open} alt="hamburger" />
          </button>
          <ul id="menu">
            <div className="menu-items">
              <button className="icon-close" id="hamburger-close">
                <img
                  className="close"
                  src={hamburger_close}
                  alt="hamburger-close"
                />
              </button>
              <li>
                <Link to="/">
                  <strong>00</strong> HOME
                </Link>
              </li>
              {/* <li>
                <Link to="">
                  <strong>01</strong> WHITEPAPER
                </Link>
              </li> */}
              <li>
                <Link to="/mint">
                  <strong>02</strong> MINT
                </Link>
              </li>
            </div>
            <div className="menu-button">
              {connectedAccount ? (
                <button onClick={connectWallet} className="btn mint-button">
                  {truncate(connectedAccount, 4, 4, 11)}{" "}
                </button>
              ) : (
                <button onClick={connectWallet} className="btn mint-button">
                  CONNECT WALLET
                </button>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

// 1. Fix the Alert POP UP
// 2. Create a disconect button
// 3. Add a home link to logo
// 4. Fix the mobile nav
// 5.
