import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const CheckAuthUser = ({ children }) => {
  const [cookies, setCookie] = useCookies(["auth_token"]);
  const { uniqueId } = useParams();
    const navigate = useNavigate();
    
  if (cookies.user_token) {
      
      return children;
      
  } else {
    toast.error("Please login first", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return <Navigate to={`/user_login/${uniqueId}`} />;
    
  }
};
