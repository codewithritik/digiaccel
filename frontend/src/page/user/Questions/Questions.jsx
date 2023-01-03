import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "../../../componet/Spinner/Spinner";
import { GetQuizeData, QuestionDifficultyAction, Usermarks } from "../../../Redux/action";
import { Contanier } from "./style";
import { useCookies } from "react-cookie";
import { Form } from "react-bootstrap";
import { LoginBtn } from "../../../componet/form/Form";

export const QuestionsPage = () => {
  const { uniqueId } = useParams();

  const dispatch = useDispatch();
  const quizeData = useSelector((s) => s.quizeData);
  const Result = useSelector((s) => s.userResult);
  const questionDifficulty = useSelector((s) => s.questionDifficulty);
  const [cookies, setCookie] = useCookies(["auth_token"]);
  const question = quizeData?.data?.QuizData;
  const [questions, setquestions] = useState();
  const [data, setdata] = useState({
    firstOption: false,
    secondOption: false,
    thirdOption: false,
    fourthOption: false,
  });

  const [quizEnd, setquizEnd] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${cookies?.user_token}` },
  };

  //    console.log("this sis", questionDifficulty);
  // console.log("this sis qurd", data);

  useEffect(() => {
    dispatch(GetQuizeData(uniqueId, config, questionDifficulty));
  }, []);

  useEffect(() => {
    if (question) {
      const ans = Fliter(question, questionDifficulty);
      setquestions(ans);
    }
  }, [question, questionDifficulty]);

  const handleChange = (e) => {
    //   console.log(e.target.name);
    const name = e.target.name;
    const value = e.target.checked;
    // console.log(value)
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      questions[0]?.firstOption?.isCorrect == data?.firstOption &&
      questions[0]?.secondOption?.isCorrect == data?.secondOption &&
      questions[0]?.thirdOption?.isCorrect == data?.thirdOption &&
      questions[0]?.fourthOption?.isCorrect == data?.fourthOption
    ) {
      dispatch(QuestionDifficultyAction(questionDifficulty + 1));
      dispatch(Usermarks(Result + 5));
    } else {
      dispatch(Usermarks(Result - 2));
      setquizEnd(true);
    }
  };

  if (quizeData.onLoading || !questions) {
    return <Spinner></Spinner>;
  }

  //console.log("this sis qurd", questions, questionDifficulty, quizEnd, Result);

  if (quizeData?.onError && !quizeData.onLoading) {
    return (
      <Contanier>
        <div className="model-div onerror">
          <img src={"/incomplete.jpg"} alt="incompletedata" />
          <h1>{quizeData?.onError}</h1>
        </div>
      </Contanier>
    );
  }

  if (questions.length == 0) {
    return (
      <Contanier>
        <div className="model-div onerror">
          <img src={"/incomplete.jpg"} alt="incompletedata" />
          <h1>don't have any question</h1>
        </div>
      </Contanier>
    );
  }

  //   if (quizeData?.data?.QuizData?.length != 10) {
  //     return (
  //       <Contanier>
  //         <div className="model-div onerror">
  //           <img src={"/incomplete.jpg"} alt="incompletedata" />
  //           <h1>This Quiz is Incomplete</h1>
  //         </div>
  //       </Contanier>
  //     );
  //   }

  if (quizEnd) {
   return  <Contanier>
      <div className="model-div onerror">
        <img src={"/quiz.jpg"} alt="quizend" />
        <h1>Your quize ended</h1>
        <h2>Your Scroe:  {Result}</h2>
      </div>
    </Contanier>;
  }

  return (
    <Contanier>
      <div className="model-div">
        <h4>Question:- {questions[0].question}</h4>
        <h5>
          Difficulty Level <span>{questions[0]?.difficulty}</span>
        </h5>
        <div>
          <h5>Choose the correct options</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Check
              type="checkbox"
              id={`checkbox`}
              label={questions[0]?.firstOption?.option}
              onChange={handleChange}
              name="firstOption"
              value={data?.firstOption}
            />
            <Form.Check
              type="checkbox"
              id={`checkbox`}
              label={questions[0]?.secondOption?.option}
              onChange={handleChange}
              name="secondOption"
              value={data?.secondOption}
            />
            <Form.Check
              type="checkbox"
              id={`checkbox`}
              label={questions[0]?.thirdOption?.option}
              onChange={handleChange}
              name="thirdOption"
              value={data?.thirdOption}
            />
            <Form.Check
              type="checkbox"
              id={`checkbox`}
              label={questions[0]?.fourthOption?.option}
              onChange={handleChange}
              name="fourthOption"
              value={data?.fourthOption}
            />

            <LoginBtn type="submit">Next</LoginBtn>
          </Form>
        </div>
      </div>
    </Contanier>
  );
}


function Fliter(data, value) {
    const filtered = data.filter((employee) => {
        return employee.difficulty >= value;
    });
    return filtered;
}