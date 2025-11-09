import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = ({ className }) => {
  return (
    <header className={className}>
      <nav>
        <ul>
          <Link to="/table">Таблица</Link>
          <Link to="/">Запись на прием</Link>
          <Link to="/login">Войти</Link>
        </ul>
      </nav>
    </header>
  );
};

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #525252ff;
  color: #fff;

  nav {
    width: 100%;
  }

  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
