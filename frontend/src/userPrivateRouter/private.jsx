import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRouteUser = ({ children }) => {
  const [cookies, setCookie] = useCookies(["auth_token"]);
  const { uniqueId } = useParams();
  const navigate= useNavigate()
  
  if (cookies.user_token) {
    return  <Navigate to={`/quiz/${uniqueId}`} />;
  } else {
    return children;
  }
};
