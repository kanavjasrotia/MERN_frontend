import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";
import "./ShopSidebar.scss";
import logo from "../../assets/logo-white.png";

const ShopSidebar = () => {
  return (
    <Col lg={2} className={`shop-sidebar  p-2 `}>
      <div className="logo px-3 mb-5">
        <img src={logo}></img>
      </div>
      <ul className=" p-0">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end
            to="addProduct"
          >
            Add Product
          </NavLink>
        </li>
      </ul>
    </Col>
  );
};

export default ShopSidebar;
