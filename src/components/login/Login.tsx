import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../utils/login";
import { MDBTabsPane, MDBBtn } from "mdb-react-ui-kit";
import { Container, Row, Col } from "react-bootstrap";

import { IError } from "../../core/interface/IError";
import { toast } from "react-toastify";
import { notify } from "../../utils/toast";

const Login: React.FC<{ isshow: boolean }> = ({ isshow }) => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<IError>({
    error: false,
    msg: "",
    description: "",
  });

  //NOTIFY IF ERROR OCCURS
  useEffect(() => {
    if (error.error && error.msg) {
      toast.dismiss();
      notify(error.msg, "error");
    }
  }, [error]);

  //FORM VALIDATION
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
        break;
      case "password":
        setPasswordError(
          value.trim().length >= 6
            ? ""
            : "Password must be greater than 5 characters"
        );
        break;
      default:
        break;
    }
  };

  //SUBIT LOGIN FORM
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    // toast.dismiss();
    // notify("logging in", "info");

    //GET FORM ELEMENT
    const formData = new FormData(event.currentTarget);
    //GET FORM DATA
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email, password);
    //CALL LOGIN METHOD

    let success;

    await toast.promise((success = login({ email, password, setError })), {
      pending: "Logging in",
      success: "Logged in successfully 👌",
      error: "Login failed",
    });
    if ((await success) === true) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <MDBTabsPane show={isshow}>
        <Container className="p-3 my-5">
          <Row className="d-flex justify-content-center">
            <Col lg={6} md={6} sm={10}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid "
                alt="Phone image"
              />
            </Col>

            <Col lg={6} md={6} sm={10}>
              <form onSubmit={handleSubmit}>
                <div className="mb-5 mt-2">
                  <input
                    type="email"
                    name="email"
                    className={`form-control form-control-lg ${
                      emailError && "is-invalid"
                    }`}
                    placeholder="Email address"
                    onBlur={handleBlur}
                    required
                  />
                  {emailError && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    className={`form-control form-control-lg ${
                      passwordError && "is-invalid"
                    }`}
                    placeholder="Password"
                    onChange={handleBlur}
                    required
                  />
                  {passwordError && (
                    <div className="invalid-feedback mb-1">{passwordError}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                  Sign in
                </MDBBtn>
              </form>
            </Col>
          </Row>
        </Container>
      </MDBTabsPane>
    </>
  );
};

export default Login;
