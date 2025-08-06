import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import Login from "../components/pageComponents/Login";
import Register from "../components/pageComponents/Register";

const Auth = ({ render = "login" }) => {
  const renderAuthForm = () => {
    switch (render) {
      case "register":
        return <Register />;
      case "login":
      default:
        return <Login />;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page-forms w-full sm:w-[428px] md:w-[448px] lg:w-[448px] flex flex-col">
        <div className="flex flex-col h-full px-7 md:px-6 py-10 gap-8 mx-5">
          {renderAuthForm()}

          {/* Toggle between login/register */}
          <div className="text-center">
            {render === "login" ? (
              <div className="text-center text-sm text-grey-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-orange-300 hover:text-orange-400 font-medium transition-colors"
                >
                  Sign up
                </a>
              </div>
            ) : (
              <div className="text-center text-sm text-grey-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-orange-300 hover:text-orange-400 font-medium transition-colors"
                >
                  Sign in
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="auth-bg w-full h-full flex justify-center align-center"></div>
    </div>
  );
};

export default Auth;
