
import Form from "react-bootstrap/Form";
import { QuestionCont } from "./style";
import { LoginBtn, SignupCont } from "../../../componet/form/Form";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AdminRegistration, GetQuizeData } from "../../../Redux/action";
import { FalierToaster, SuccessToaster } from "../../../componet/Toster/toster";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MyVerticallyCenteredModal } from "../../../componet/Popup/CenterModal";

export const CreateQuestion = () => {
    const [validated, setValidated] = useState(false);
        const adminDeatils = useSelector((s) => s.adminData);
      
        const dispatch = useDispatch();
    const { uniqueId, questionNo } = useParams();
     const [modalShow, setModalShow] = useState(false);
        // const quizedata = useSelector((s)=> s.quizeData)
        // const quizeLength = quizedata?.data?.QuizData;
    
        // console.log("this is data", quizeLength);

        //  useEffect(()=> {
        //         dispatch(GetQuizeData(uniqueId))
        //     },[])
    const [cookies, setCookie] = useCookies(["auth_token"]);



    const config = {
      headers: { Authorization: `Bearer ${cookies.auth_token}` },
    };

    const navigate = useNavigate();

    
    const [formValue, setFormValue] = useState({
      question: "",
      difficulty: "false",
    });

    const [first, setFirst] = useState({
        option: "",
        isCorrect: false,
    });

    const [second, setSecond] = useState({
        option: "",
        isCorrect: false,
    });

    const [third, setThird] = useState({ 
        option: "",
        isCorrect: false,
    });
    

    const [fourth, setFourth] = useState({  
        option: "",
        isCorrect: false,
    });


    // console.log("this is first", first)

    // console.log("this is question", questionNo, uniqueId);

    const handleChange = (e) => {
        
        setFormValue({ ...formValue , [e.target.name]:e.target.value});

    };

 const handleClear  = () => {
    document.getElementById("Form-data-resest").reset();
  }
console.log("this is inside submit");
  const handleSubmit = (event) => {
      console.log("this is inside submit");
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);
    }
    if (first?.isCorrect==false &&  second?.isCorrect==false &&  third?.isCorrect==false &&   fourth?.isCorrect==false) {
            return FalierToaster("One Answer must be Correct");
    }
    if (formValue.difficulty == "false") {
            return FalierToaster("Please Choose Difficuly");
                //console.log(typeof formValue.difficulty);
    } 
    else {
      console.log("this is inside submit")
        axios
          .patch(
            `${process.env.REACT_APP_BASEURL}quiz/${uniqueId}`,
            {
              ...formValue,
              firstOption: first,
              secondOption: second,
              thirdOption: third,
              fourthOption: fourth,
            },
           config
          )
          .then((res) => {

            // console.log(res);

            const length  = res?.data?.data?.QuizData?.length
            if (length == 10) {
              setModalShow(true);
              
               } else {
             

                 setFormValue({ question: "", difficulty: "false" });
                 setFirst({
                   option: "",
                   isCorrect: false,
                 });
setSecond({
  option: "",
  isCorrect: false,
});
setThird({
  option: "",
  isCorrect: false,
});
                 setFourth({
                   option: "",
                   isCorrect: false,
                 });
                 handleClear();
                 
                 SuccessToaster("New Question Added Sucessfully");

                 navigate(`/question/${uniqueId}/${length + 1}`);
               }
            
          })
          .catch((err) => {
            // console.log(err)
                FalierToaster(err?.response?.data?.msg || err)
          });
    }    
    };

  
    // console.log(first,second,third,fourth);
    
    return (
      <QuestionCont>
        <div className="model-div">
          <div>
            <h2>Add {questionNo} Question</h2>
            <div className="formdiv">
              <Form
                id="Form-data-resest"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Add your question</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    onChange={handleChange}
                    required
                    name="question"
                  />
                </Form.Group>
                <Form.Group
                  controlId="validationCustom01"
                  style={{ margin: "10px 0px" }}
                >
                  <Form.Label>First Option</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstOption"
                    required
                    value={first?.option}
                    onChange={(e) => {
                      setFirst({ ...first, option: e.target.value });
                    }}
                    placeholder=""
                  />
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    name="firstSwitch"
                    checked={first?.isCorrect}
                    onChange={(e) => {
                      setFirst({ ...first, isCorrect: !first.isCorrect });
                    }}
                    style={{ margin: "5px 0px" }}
                    label="Check this switch if this answer is Correct"
                  />
                </Form.Group>
                <Form.Group
                  controlId="validationCustom01"
                  style={{ margin: "10px 0px" }}
                >
                  <Form.Label>Second Option</Form.Label>
                  <Form.Control
                    type="text"
                    name="secondOption"
                    required
                    placeholder=""
                    value={second?.option}
                    onChange={(e) => {
                      setSecond({ ...second, option: e.target.value });
                    }}
                  />
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    style={{ margin: "5px 0px" }}
                    name="secondSwitch"
                    label="Check this switch if this answer is Correct"
                    checked={second?.isCorrect}
                    onChange={(e) => {
                      setSecond({ ...second, isCorrect: !second.isCorrect });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  controlId="validationCustom01"
                  style={{ margin: "10px 0px" }}
                >
                  <Form.Label>Third Option</Form.Label>
                  <Form.Control
                    type="text"
                    name="thirdOption"
                    required
                    placeholder=""
                    value={third?.option}
                    onChange={(e) => {
                      setThird({ ...third, option: e.target.value });
                    }}
                  />
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    name="thirdSwitch"
                    style={{ margin: "5px 0px" }}
                    label="Check this switch if this answer is Correct"
                    checked={third?.isCorrect}
                    onChange={(e) => {
                      setThird({ ...third, isCorrect: !third.isCorrect });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  controlId="validationCustom01"
                  style={{ margin: "10px 0px" }}
                >
                  <Form.Label>Fourth Option</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="fourthOption"
                    placeholder=""
                    value={fourth?.option}
                    onChange={(e) => {
                      setFourth({ ...fourth, option: e.target.value });
                    }}
                  />
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    style={{ margin: "5px 0px" }}
                    name="fourthSwitch"
                    label="Check this switch if this answer is Correct"
                    checked={fourth?.isCorrect}
                    onChange={(e) => {
                      setFourth({ ...fourth, isCorrect: !fourth.isCorrect });
                    }}
                  />
                </Form.Group>

                <Form.Group style={{ margin: "10px 0px" }}>
                  <Form.Label>Choose Difficulty</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    name="difficulty"
                    required
                    onChange={handleChange}
                  >
                    <option value="false">
                      Open this to choose difficulty
                    </option>{" "}
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                    <option value={4}>Four</option>
                    <option value={5}>Five</option>
                    <option value={6}>Six</option>
                    <option value={7}>Seven</option>
                    <option value={8}>Eight</option>
                    <option value={9}>Nine</option>
                    <option value={10}>Ten</option>
                  </Form.Select>
                </Form.Group>
                <LoginBtn type="submit">
                  {/* {quizedata?.onLoading ? (
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
                  ) : (
                    "Add Question Now"
                  )} */}
                  Add Question Now
                </LoginBtn>
              </Form>
            </div>
          </div>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </QuestionCont>
    );
};



function ApiCall() {
    
}