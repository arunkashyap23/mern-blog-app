import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "../../services/post/postService";
import "./singlePost.css";

export default function SinglePost() {
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  //to get the id from the url
  const path = location.pathname.split("/")[2];
  const singlePost = useGetSinglePostQuery(path);

  useEffect(() => {
    const getSinglePost = () => {
      if (singlePost.isSuccess) {
        setPost(singlePost.data);
        setTitle(singlePost.data.title);
        setDesc(singlePost.data.desc);
      }
    };
    getSinglePost();
  }, [singlePost, post]);

  const dataForUpdatePost = {
    username: user?.username,
    token: user?.token,
    title: title,
    desc: desc,
    id: post._id,
  };

  const handleUpdate = async () => {
    const res = await updatePost(dataForUpdatePost);
    if (res.data.status === "success") {
      window.location.replace("/");
    }
  };

  const dataForDeletePost = {
    username: user?.username,
    id: post._id,
    token: user?.token,
  };

  const handleDelete = async () => {
    const res = await deletePost(dataForDeletePost);
    if (res.data.status === "success") {
      window.location.replace("/");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {/* This post is coming from backend and this user is coming from local storage to check if this is the same user or not  */}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={(e) => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                <b>{post.username}</b>
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
