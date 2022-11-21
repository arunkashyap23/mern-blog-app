import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../services/user/userService";
import {
  deleteUserDispatch,
  updateUserDispatch,
} from "../../features/auth/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const PF = "http://localhost:5000/images/";

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth.user);

  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const dispatch = useDispatch();
  
  const data = {
    userId: user.id,
    username,
    email,
    password,
    token: user.token,
  };


  useEffect(() => {
    if (isSuccess) {
      toast.success("User Updated Successfully", { autoClose: 1500 });
      setTimeout(() => {
        window.location.reload("/settings");
      }, 2000);
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data1 = new FormData();
      const filename = Date.now() + file.name;
      data1.append("name", filename);
      data1.append("file", file);
      data.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data1);
      } catch (err) {}
    }
    const res = await updateUser(data);
    if (res.data.status === "success") {
      dispatch(updateUserDispatch(res.data));
      localStorage.setItem("user", JSON.stringify({ ...user, ...res.data }));
    }
  };

  const dataForDelete = {
    userId: user.id,
    token: user.token,
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteUser(dataForDelete);
    if (res.data.status === "success") {
      dispatch(deleteUserDispatch());
      localStorage.removeItem("user");
      window.location.replace("/");
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
