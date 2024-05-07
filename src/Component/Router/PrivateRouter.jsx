import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";




const PrivateRouter = ({ children }) => {
    const { auths } = useContext(AuthContext);
    const user = auths?.user;
    const location = useLocation();


    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRouter;