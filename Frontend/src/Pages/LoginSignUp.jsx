import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/LoginSignUp.css";
import eyeIcon from "../Components/Assets/open-eye.jpg";
import eyeSlashIcon from "../Components/Assets/close-eye.jpg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  handleSwitchMode,
  showPassword,
  setShowPassword,
  handleGoogleSuccess,
  handleGoogleFailure,
}) => (
  <form className="login" onSubmit={handleSubmit}>
    <h1>Login</h1>
    <div className="input-container">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email Address"
        className="login-sign-up-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="login-sign-up-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <img
        src={showPassword ? eyeSlashIcon : eyeIcon}
        alt="Toggle Password Visibility"
        className="toggle-password-icon"
        onClick={() => setShowPassword((prev) => !prev)}
      />
    </div>
    <button className="login-sign-up-btn" type="submit">
      Continue
    </button>
    <p>
      Create an account?{" "}
      <b className="login-sign-up-text" onClick={handleSwitchMode}>
        Create here
      </b>
    </p>
    <div>
      <input type="checkbox" id="login-checkbox" required />
      <label htmlFor="signup-checkbox" className="checkbox-label">
        By continuing, I agree to the terms of use &{" "}
        <Link to="/E-commerce/privacypolicy" className="login-sign-up-text">
          privacy policy
        </Link>
      </label>
    </div>
    <p className="google-or">--OR--</p>
    <div className="googleAuthLogin">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  </form>
);

const SignUp = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  handleSwitchMode,
  showPassword,
  setShowPassword,
  handleGoogleSuccess,
  handleGoogleFailure,
}) => (
  <form className="sign-up" onSubmit={handleSubmit}>
    <h1>Sign Up</h1>
    <div className="input-container">
      <input
        type="text"
        placeholder="Your Name"
        className="login-sign-up-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <input
        type="email"
        placeholder="Email Address"
        className="login-sign-up-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="login-sign-up-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <img
        src={showPassword ? eyeSlashIcon : eyeIcon}
        alt="Toggle Password Visibility"
        className="toggle-password-icon"
        onClick={() => setShowPassword((prev) => !prev)}
      />
    </div>
    <button className="login-sign-up-btn" type="submit">
      Continue
    </button>
    <p>
      Already have an account?{" "}
      <b className="login-sign-up-text" onClick={handleSwitchMode}>
        Login here
      </b>
    </p>
    <div>
      <input type="checkbox" id="signup-checkbox" required />
      <label htmlFor="signup-checkbox" className="checkbox-label">
        By continuing, I agree to the terms of use &{" "}
        <Link to="/E-commerce/privacypolicy" className="login-sign-up-text">
          privacy policy
        </Link>
      </label>
    </div>
    <p className="google-or">--OR--</p>
    <div className="googleAuthLogin">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  </form>
);

export const LoginSignUp = () => {
  const [loginsignup, setLoginsignup] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSwitchMode = useCallback(() => {
    setLoginsignup((prevMode) => (prevMode === "login" ? "signup" : "login"));
    setPassword("");
    setName("");
    setShowPassword(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      loginsignup === "login"
        ? `${process.env.REACT_APP_API_KEY}user/login`
        : `${process.env.REACT_APP_API_KEY}user/signup`;

    const data =
      loginsignup === "login" ? { email, password } : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.uid);

        toast.success(
          loginsignup === "signup"
            ? "User created successfully"
            : "Logged in successfully"
        );

        setTimeout(() => {
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
          }
        }, 1500);
      } else {
        if (result.error === "User already exists") {
          toast.warn(result.error);
        } else {
          toast.error(result.error || "Something went wrong");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const url = `${process.env.REACT_APP_API_KEY}user/googleAuth`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.uid);

        toast.success(
          loginsignup === "signup"
            ? "User created successfully"
            : "Logged in successfully"
        );

        setTimeout(() => {
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
          }
        }, 1500);
      } else {
        toast.error(result.error || "Google Authentication failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleFailure = () => {
    toast.error("Google Authentication failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <div className="login-sign-up">
        <div className="login-sign-up-card">
          {loginsignup === "login" ? (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              handleSwitchMode={handleSwitchMode}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleGoogleSuccess={handleGoogleSuccess}
              handleGoogleFailure={handleGoogleFailure}
            />
          ) : (
            <SignUp
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              handleSwitchMode={handleSwitchMode}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleGoogleSuccess={handleGoogleSuccess}
              handleGoogleFailure={handleGoogleFailure}
            />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
