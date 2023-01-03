import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CheckAuthRoute = ({ children }) => {
  const [cookies, setCookie] = useCookies(["auth_token"]);

  if (cookies.auth_token) {
      return <Navigate to="/allquizlink" />;
  } else {
      
      return children;

  }


};
