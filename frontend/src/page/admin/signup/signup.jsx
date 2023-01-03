import {  LoginBtn, SignupCont } from "../../../componet/form/Form"
import Form from "react-bootstrap/Form";
import { useCookies } from "react-cookie";
import { useState } from "react";
import {  FloatingLabel, Spinner } from "react-bootstrap";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminRegistration } from "../../../Redux/action";

export const AdminSignup = () => {
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState();
  const adminDeatils = useSelector((s) => s.adminData);
    const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
    const dispatch  = useDispatch()
    const handleChange = (e) => {
        setFormValue({ ...formValue , [e.target.name] : e.target.value});
    }
    const navigate  = useNavigate() 
    
    const handleSubmit = (event) => {
          event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false){
        event.preventDefault();
          event.stopPropagation();
    
        
        setValidated(true);
        }
      else {
        dispatch(AdminRegistration(formValue, setCookie, navigate));
     

    
        }

    };

  
    return (
      <SignupCont>
        <div className="LeftContanier">
          <img src="/background.svg" alt="background" />
        </div>
        <div className="RightContanier">
          <div>
            <h2>Admin Registration</h2>
            <div className="formdiv">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="text"
                      minLength="4"
                      maxLength="20"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="validationCustom01">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="name@example.com"
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="validationCustom01">
                  <FloatingLabel
                    required
                    controlId="floatingInput"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="password"
                      placeholder="password"
                      minLength="8"
                      maxLength="20"
                      name="password"
                      onChange={handleChange}
                    />

                    {adminDeatils?.onError ? (
                      <Form.Text
                        id="passwordHelpBlock"
                        style={{ color: "red" }}
                      >
                        {adminDeatils?.onError}
                      </Form.Text>
                    ) : (
                      <Form.Text id="passwordHelpBlock" muted>
                        password should contain a minimum of 8 characters with 1
                        special 1 letter and 1 numeric
                      </Form.Text>
                    )}
                  </FloatingLabel>
                </Form.Group>
                <LoginBtn type="submit">
                  {adminDeatils?.onLoading && (
                    <Spinner
                    animation="border"
                    role="status"
                    style={{
                      color: "white",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  )}
                 
                  Submit form
                </LoginBtn>
              </Form>
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Already Registered User? <Link to="/">Click here to login</Link>
            </p>
          </div>
        </div>
      </SignupCont>
    );
}