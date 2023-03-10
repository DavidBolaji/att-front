import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import InputComponent from "./Input/InputComponent";
import { Link } from "react-router-dom";

const RegistrationComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailValid(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      // TODO: submit the login form to the server
      const res = await ctx.onRegister(email, password);
      if (res) {
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    }
  };

  // update form validity whenever email or password validity changes
  React.useEffect(() => {
    setFormValid(emailValid && passwordValid);
  }, [emailValid, passwordValid]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          HCC
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <InputComponent
                handleChange={handleEmailChange}
                type={"email"}
                value={email}
                valid={emailValid}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <InputComponent
                handleChange={handlePasswordChange}
                type={"password"}
                value={password}
                valid={passwordValid}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={!emailValid || !passwordValid}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  emailValid && passwordValid
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-400 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-sm mt-6">
            <p className="text-gray-600">
              Have an account?{" "}
              <Link
                to="/"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComponent;
