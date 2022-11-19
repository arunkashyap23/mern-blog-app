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

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth.user);
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const data = {
    userId: user.id,
    username,
    email,
    password,
    token: user.token,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      alert("User Updated Successfully");
      setTimeout(() => {
        window.location.reload("/settings");
      }, 2000);
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUser(data);
    if (res.data.status === "success") {
      dispatch(updateUserDispatch(res.data));
      const usernameValueFromLS = JSON.parse(localStorage.getItem("user"));
      usernameValueFromLS.username = res.data.username;
      localStorage.setItem("user", JSON.stringify(usernameValueFromLS));
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
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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
