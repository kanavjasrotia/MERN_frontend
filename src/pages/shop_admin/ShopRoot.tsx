import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";

import ShopSidebar from "../../components/shop_pannel/ShopSidebar";

const ShopRoot = () => {
  return (
    <>
      <ToastContainer />
      <Container fluid className="p-0 m-0">
        <Row className="">
          <ShopSidebar />

          <Col lg={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShopRoot;
