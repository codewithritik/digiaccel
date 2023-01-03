import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from "../../../componet/Spinner/Spinner";
import { GetAdminDetails, GetQuizeDataByAdminID } from "../../../Redux/action";
import { Contanier } from "./style"
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaClipboard } from "react-icons/fa";
import { FalierToaster, SuccessToaster } from "../../../componet/Toster/toster";
import { LoginBtn } from "../../../componet/form/Form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AllQuizLinkPage = () => {
  const adminData = useSelector((s) => s.adminData);
  const quizeData = useSelector((s) => s.quizeData);
  const [cookies, setCookie] = useCookies(["auth_token"]);

  // console.log(cookies.auth_token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${cookies.auth_token}` },
  };

  useEffect(() => {
    dispatch(GetAdminDetails(config));
    dispatch(GetQuizeDataByAdminID(config));
  }, []);

  const HandleClick = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}quiz`,
        {
          adminDetails: adminData?.data?._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        //   console.log(res?.data?.data);
        const uniqueId = res?.data?.data?.uniqueId;

        if (uniqueId) {
          navigate(`/question/${uniqueId}/1`);
        } else {
          FalierToaster("something went wrong please try again");
        }
      })
      .catch((err) => {
        // console.log(err);
        FalierToaster("something went wrong please try again");
      });
  };

  if (adminData.onLoading || quizeData.onLoading) {
    return <Spinner />;
  }

  return (
    <Contanier>
      <div className="model-div">
        <h2>Welcome Back, {adminData?.data?.name}</h2>

        {quizeData?.data?.length == 0 ? (
          <div>
            <h4>You don't have any quize live</h4>
          </div>
        ) : (
          <div>
            <h4>All Quiz Link</h4>
            {quizeData?.data?.map((e, index) => {
              return e?.QuizData?.length == 10 ? (
                <div key={e._id} className="linkDiv">
                  <div>
                    <p>
                      http://localhost:3000/user/quiz/
                      {e.uniqueId}
                    </p>
                  </div>

                  <CopyToClipboard
                    text={`http://localhost:3000/user/quiz/${e.uniqueId}`}
                    onCopy={() => {
                      SuccessToaster("Copied to clipboard");
                    }}
                  >
                    <span>
                      <FaClipboard fontSize={"20px"} />
                    </span>
                  </CopyToClipboard>
                </div>
              ) : (
                <div key={e._id} className="linkDiv">
                  <div>
                    <p>
                      http://localhost:3000/user/quiz/
                      {e.uniqueId}
                    </p>
                  </div>
                  <button
                    className="completbtn"
                    onClick={() => {
                      navigate(
                        `/question/${e.uniqueId}/${e?.QuizData?.length + 1}`
                      );
                    }}
                  >
                    Complete Now
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <LoginBtn onClick={HandleClick}>Create Quiz Now</LoginBtn>
      </div>
    </Contanier>
  );
}