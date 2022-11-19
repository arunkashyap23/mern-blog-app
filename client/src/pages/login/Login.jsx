import "./login.css";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../../services/auth/authService";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    username,
    password,
  };

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(data);
    if (res.data.status === "success") {
      dispatch(login(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    } else if (res.data.status === "error") {
      alert(res.data.status);
    } else {
      window.location.replace("/login");
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
