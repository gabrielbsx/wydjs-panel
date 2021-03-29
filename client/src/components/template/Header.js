import { menu } from "./menu";

function Header() {
  const menu = require("./menu");

  const getItem = (item) => {
    return (
        <li>
        </li>
    );
  };

  return (
    <div>
      <div class="menu">
        <div class="wrapper">
          <a href="/" class="navi-button" onclick="toggleNavi();">
            <span></span>
          </a>
          <ul class="navi">
              {menu.map((item, index) => {
                  return <>{getItem(item)}</>
              })}
            <li>
              <a href="/">
                <span>INÍCIO</span>
                <p>Página Inicial</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
