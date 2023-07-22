import { useState, useRef, useEffect } from "react";
import { MDBTabsPane, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import { Row, Col } from "react-bootstrap";

import { register } from "../../utils/register";
import { IError } from "../../core/interface/IError";
import { notify } from "../../utils/toast";

const Register: React.FC<{ isshow: boolean }> = ({ isshow }) => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [isShop, setIsShop] = useState<boolean>(false);

  const [error, setError] = useState<IError>({
    error: false,
    msg: "",
    description: "",
  });

  //NOTIFY IF ERROR OCCURS
  useEffect(() => {
    if (error.error && error.msg) {
      notify(error.msg, "error");
    }
  }, [error]);

  const [ownerNameError, setOwnerNameError] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setNameError(value.trim() ? "" : "name is required");
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
        break;
      case "password":
        if (value.trim().length < 6) {
          setPasswordError("Password must be at least 6 characters long");
        } else {
          setPasswordError("");
        }
        break;
      case "confirmPassword":
        const passwordValue = passwordRef.current?.value;
        console.log(passwordValue);
        if (value.trim() === "") {
          console.log("empty");
          setConfirmPasswordError("Confirm Password is required");
        } else if (value !== passwordValue) {
          console.log("diff");
          setConfirmPasswordError("Passwords do not match");
        } else {
          setConfirmPasswordError(""); // Reset the error if passwords match
        }
        break;
      case "ownerName":
        setOwnerNameError(value.trim() ? "" : "Owner Name is required");
        break;
      default:
        break;
    }
  };

  const handleShopCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsShop(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const success = await register({ formData, setError });
    if (success) {
      notify("logged in successfully", "success");
    }
  };

  return (
    <>
      <MDBTabsPane show={isshow}>
        <MDBContainer className="p-3 my-5 h-custom">
          <Row>
            <Col lg={6} md={6} sm={10}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </Col>

            <Col lg={6} md={6} sm={10}>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-2">
                  <input
                    type="text"
                    name="name"
                    className={`form-control form-control-lg ${
                      nameError && "is-invalid"
                    }`}
                    placeholder="name"
                    onBlur={handleBlur}
                    required
                  />
                  {nameError && (
                    <div className="invalid-feedback">{nameError}</div>
                  )}
                </div>

                <div className="mb-4 mt-2">
                  <input
                    type="email"
                    name="email"
                    className={`form-control form-control-lg ${
                      emailError && "is-invalid"
                    }`}
                    placeholder="Email address"
                    onBlur={handleBlur}
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  />
                  {emailError && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    ref={passwordRef}
                    name="password"
                    className={`form-control form-control-lg ${
                      passwordError && "is-invalid"
                    }`}
                    placeholder="Password"
                    onBlur={handleBlur}
                    required
                  />
                  {passwordError && (
                    <div className="invalid-feedback">{passwordError}</div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control form-control-lg ${
                      confirmPasswordError && "is-invalid"
                    }`}
                    placeholder="Confirm Password"
                    onChange={handleBlur}
                    required
                  />
                  {confirmPasswordError && (
                    <div className="invalid-feedback">
                      {confirmPasswordError}
                    </div>
                  )}
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    name="isShop"
                    className="form-check-input"
                    checked={isShop}
                    onChange={handleShopCheckboxChange}
                  />
                  <label className="form-check-label">Sign up as a shop</label>
                </div>

                {isShop && (
                  <div className="mb-4">
                    <input
                      type="text"
                      name="ownerName"
                      className={`form-control form-control-lg ${
                        ownerNameError && "is-invalid"
                      }`}
                      placeholder="Owner Name"
                      onBlur={handleBlur}
                      required={isShop} // Make this field required only when the checkbox is checked
                    />
                  </div>
                )}
                <div className="text-center text-md-start mt-4 pt-2">
                  <MDBBtn className="mb-0 px-5 w-100" size="lg" type="submit">
                    Sign up
                  </MDBBtn>
                </div>
              </form>
            </Col>
          </Row>
        </MDBContainer>
      </MDBTabsPane>
    </>
  );
};

export default Register;
