import axios from "axios";
import React, { useState, useEffect } from "react";

const Allpost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/posts")
      .then((response) => {
        //console.log(response);
        setPosts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <div className="card">
          <div className="card__head">
            <p className="card__head--name">{post.UserId}</p>
            <p className="card__head--date">{post.createdAt}</p>
          </div>
          <div className="card__image">
            <img className="card__image--img" src={post.attachment} />
          </div>
          <div className="card__content">
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allpost;
