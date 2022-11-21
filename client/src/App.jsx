import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/post/:postId" element={<Single />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route path="/login" element={user ? <Homepage /> : <Login />} />
          <Route
            path="/register"
            element={user ? <Homepage /> : <Register />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
