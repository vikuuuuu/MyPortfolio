import { useState } from "react";
import "./Menu.css";

function Menu() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  function showtoggle() {
    setIsShowMenu(!isShowMenu);
  }
  return (
    <>
      <header className="header">
        <h2>Vikuu</h2>
        <nav className="navbar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#About">About</a>
            </li>
            <li>
              <a href="#Skill">Skill</a>
            </li>
            <li>
              <a href="#Project">Project</a>
            </li>
            <li>
              <a href="#Contact">Contact</a>
            </li>
          </ul>
        </nav>
        {isShowMenu && (
          <nav className="navbar2">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#About">About</a>
              </li>
              <li>
                <a href="#Skill">Skill</a>
              </li>
              <li>
                <a href="#Project">Project</a>
              </li>
              <li>
                <a href="#Contact">Contact</a>
              </li>
              <li>
                <a href="/loginPage">Login</a>
              </li>
            </ul>
          </nav>
        )}
        <i className="bx bx-menu" onClick={showtoggle}></i>
      </header>
    </>
  );
}
export default Menu;
