import { Navigate, useLocation } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

export default function ProtectedRoute({ children }) {
  const { user } = useLibrary();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}