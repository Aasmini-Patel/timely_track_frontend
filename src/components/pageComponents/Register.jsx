import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";

const Register = () => {
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleRegister = async (values) => {
    setLoading(true);
    dispatch(register(values, setLoading, navigate));
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-grey-700 mb-2">
          Hello! there, {greeting}
        </h1>
        <p className="text-base text-grey-500">
          Let's get you started
        </p>
      </div>

      <Formik
        initialValues={{
          name: "", 
          email: "", 
          password: "", 
          confirmPassword: "" 
        }}
        validate={(values) => {
          const errors = {};
          
          if (!values.name) {
            errors.firstName = "First name is required";
          }
          
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleRegister(values);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            
                        <div className="space-y-2">
              <label 
                className="block text-sm font-medium text-grey-700" 
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`w-full px-4 py-3 border rounded-lg bg-white text-grey-700 placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all ${
                  errors.name && touched.name
                    ? "border-danger-400 focus:ring-danger-200"
                    : "border-grey-200 hover:border-grey-300"
                }`}
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <span className="text-sm text-danger-400 mt-1 block">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label 
                className="block text-sm font-medium text-grey-700" 
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`w-full px-4 py-3 border rounded-lg bg-white text-grey-700 placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all ${
                  errors.email && touched.email
                    ? "border-danger-400 focus:ring-danger-200"
                    : "border-grey-200 hover:border-grey-300"
                }`}
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <span className="text-sm text-danger-400 mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label 
                className="block text-sm font-medium text-grey-700" 
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white text-grey-700 placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all ${
                    errors.password && touched.password
                      ? "border-danger-400 focus:ring-danger-200"
                      : "border-grey-200 hover:border-grey-300"
                  }`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-500 hover:text-grey-700 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <span className="text-sm text-danger-400 mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label 
                className="block text-sm font-medium text-grey-700" 
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white text-grey-700 placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-danger-400 focus:ring-danger-200"
                      : "border-grey-200 hover:border-grey-300"
                  }`}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-500 hover:text-grey-700 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="text-sm text-danger-400 mt-1 block">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <Button
              className="w-full"
              variant="primary"
              label={loading ? "Creating Account..." : "Create Account"}
              type="submit"
              disabled={isSubmitting || loading}
            />


          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;