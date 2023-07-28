import { Col, Container } from "react-bootstrap";
import { ISidebar } from "../../core/interface/ISidebar";
import "./Sidebar.scss";

const Sidebar: React.FC<ISidebar> = ({ children, width, bgColor, flexDir }) => {
  return (
    <>
      <div
        className={`sidebar ${bgColor} ${flexDir} mx-0 px-0`}
        style={{ width: `${width}%` }}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
