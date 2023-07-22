import { useState } from "react";
import { MDBTabsContent } from "mdb-react-ui-kit";
import { Container, Row, Col } from "react-bootstrap";
import Tabs from "./Tabs";
import Register from "./Register";
import Login from "./Login";

function CollectiveForm() {
  const [justifyActive, setJustifyActive] = useState<string>("tab1");

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col lg={10} md={10} sm={10} xsm={11}>
          {/* Tabs */}

          <Tabs
            handleJustifyClick={handleJustifyClick}
            justifyActive={justifyActive}
          />

          {/* Forms */}
          <Col>
            <MDBTabsContent>
              {/* login */}
              <Login isshow={justifyActive === "tab1"} />
              {/* signup */}
              <Register isshow={justifyActive === "tab2"} />
            </MDBTabsContent>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default CollectiveForm;
