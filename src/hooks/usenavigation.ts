import { useNavigate } from "react-router-dom";

export const usePageNavigation = () => {
  const navigate = useNavigate();

  return {
    goToHome: () => navigate("/"),
    goToLogin: () => navigate("/login"),
    goToCreateAccount: () => navigate("/create-account"),
    goToProfile: () => navigate("/profile"),
  };
};
