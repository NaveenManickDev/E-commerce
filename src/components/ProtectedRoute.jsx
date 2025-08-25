import { Navigate } from "react-router-dom";
import { useAuth } from "../contaxt/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contaxt/AuthContext";

// export default function ProtectedRoute({ children }) {
//     const { user } = useAuth();

//     return user ? (
//         children
//     ) : (
//         <Navigate to="/login" replace={true} />
//     );
// }
