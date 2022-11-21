import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllPostQuery } from "../../services/post/postService";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const location = useLocation();
  const getAllPost = useGetAllPostQuery(location.search);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = () => {
      if (getAllPost.isSuccess) {
        setPosts(getAllPost.data);
      }
    };
    fetchPost();
  }, [getAllPost, posts]);

  return (
    <div className="posts">
      {posts.map((p) => (
        <Post posts={p} key={p._id} />
      ))}
    </div>
  );
}
