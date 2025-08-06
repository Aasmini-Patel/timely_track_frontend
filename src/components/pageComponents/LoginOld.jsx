import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Button from "../common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const { pathname } = useLocation();
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      setGreeting("Good Morning");
    } else if (curHr < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);

    dispatch(login(values, setLoading, navigate));
  };

  return (
    <div>
      <div>
        <h1 className="text-[24px] font-medium">Hello! there, {greeting}</h1>
        <p className="mb-7 text-[16px]">
          {pathname === "/login" && <>Let's you in</>}
          {pathname === "/change_password" && <>Let's Change You Password</>}
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password is required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-6">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <span className="form-validation">
                {errors.email && touched.email && errors.email}
              </span>
            </div>
            <div className="form-group mb-6">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button
                  type="button"
                  className="absolute right-5 top-[50%] translate-y-[-50%] text-grey-500 hover:text-grey-700"
                >
                  {showPassword ? (
                    <i
                      className="ri-eye-fill text-[20px]"
                      onClick={() => setShowPassword(false)}
                    ></i>
                  ) : (
                    <i
                      className="ri-eye-off-fill text-[20px]"
                      onClick={() => setShowPassword(true)}
                    ></i>
                  )}
                </button>
              </div>
              <span className="form-validation">
                {errors.password && touched.password && errors.password}
              </span>
            </div>
            <Button
              className="w-full"
              variant="primary"
              label={loading ? "Logging In" : "Login"}
              type="submit"
              isDisabled={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
