import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRoute = ({children }) => {

    const [cookies, setCookie] = useCookies(["auth_token"]);
    
    if (cookies.auth_token) {
        return children
    }
    else {

        toast.error("Please login", {
          position: toast.POSITION.TOP_RIGHT,
        }); 

        return <Navigate to="/" />;
    }



};
