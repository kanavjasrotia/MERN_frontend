import { Container, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";

import "./Navbar.scss";
import image from "../../assets/logo-white.png";
import Sidebar from "../reuseables/Sidebar";
import { decodeToken } from "../../utils/decodeToken";
import { IDecodedToken } from "../../core/interface/IDecodedToken";
import { ERole } from "../../core/enum/Erole";

const Navbar = () => {
  const [showLink, setShowLink] = useState<boolean>(false);
  const [role, setRole] = useState<ERole>(ERole.User);

  useEffect(() => {
    let decoded: any = decodeToken();
    if (decoded && decoded.data) {
      let data: IDecodedToken = decoded.data;
      setRole(data.role);
    }
  }, []);

  const clickHandler = () => {
    setShowLink(!showLink);
  };
  return (
    <>
      <Container fluid className="navbar p-2 ">
        <Col lg={2} md={3} className="logo">
          <img src={image} alt="" />
        </Col>
        <Col lg={4} md={3} className="search p-0">
          <form className="d-flex w-75">
            <Col lg={10} className="input ">
              <input
                placeholder="search product"
                type="text"
                className="w-100"
              />
            </Col>
            <Col lg={2}>
              <button type="submit" className="w-100">
                Go
              </button>
            </Col>
          </form>
        </Col>
        <Col
          className={`hamburger d-flex justify-content-end mx-3 ${
            showLink ? "open" : ""
          }`}
        >
          <div className="cont" onClick={clickHandler}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </Col>
      </Container>

      <CSSTransition
        in={showLink}
        timeout={300}
        classNames="sidebar"
        unmountOnExit
        mountOnEnter
      >
        <Sidebar width={100} bgColor="white">
          <ul
            className="w-100"
            onClick={() => {
              setShowLink(false);
            }}
          >
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : undefined)}
                end
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : undefined)}
                end
              >
                Home
              </NavLink>
            </li>

            {role === ERole.Shop && (
              <li>
                <NavLink
                  to="/shopadmin/addProduct"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                  end
                >
                  Shop pannel
                </NavLink>
              </li>
            )}
          </ul>
        </Sidebar>
      </CSSTransition>
    </>
  );
};

export default Navbar;
