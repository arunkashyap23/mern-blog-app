import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ posts }) {
  return (
    <>
      <div className="post">
        {/* {post.photo && <img className="postImg" src={PF + post.photo} alt="" />} */}
        <div className="postInfo">
          <div className="postCats">
            {posts.categories.map((c) => (
              <span className="postCat">{c.name}</span>
            ))}
          </div>
          <Link to={`/post/${posts._id}`} className="link">
            <span className="postTitle">{posts.title}</span>
          </Link>
          <hr />
          <span className="postDate">
            {new Date(posts.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{posts.desc}</p>
      </div>
    </>
  );
}
