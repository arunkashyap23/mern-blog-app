import { useEffect,useState } from "react";
import { useGetAllPostQuery } from "../../services/post/postService";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const getAllPost = useGetAllPostQuery();
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
