import React from "react";
import { MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import { Container, Row, Col } from "react-bootstrap";

interface TabsContentProps {
  justifyActive: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ justifyActive }) => {
  return (
    <MDBTabsContent>
      <MDBTabsPane show={justifyActive === "tab1"}>
        <Container className="p-3 my-5">
          <Row>
            <Col lg={6}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid "
                alt="Phone image"
              />
            </Col>

            <Col lg={6}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values); // Handle form submission here
                }}
              >
                <Form>
                  <div className="mb-4 mt-2">
                    <Field
                      name="email"
                      type="email"
                      as={MDBInput}
                      label="Email address"
                      id="formControlLg"
                      size="lg"
                    />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      name="password"
                      type="password"
                      as={MDBInput}
                      label="Password"
                      id="formControlLg"
                      size="lg"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="d-flex justify-content-between mx-4 mb-4">
                    <a href="!#">Forgot password?</a>
                  </div>

                  <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                    Sign in
                  </MDBBtn>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Container>{" "}
      </MDBTabsPane>

      <MDBTabsPane show={justifyActive === "tab2"}>
        <Container className="p-3 my-5 h-custom">
          {/* Your tab2 content */}
        </Container>
      </MDBTabsPane>
    </MDBTabsContent>
  );
};

export default TabsContent;
