import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Allpost = () => {

  const isAdmin = localStorage.getItem('isAdmin')
  const currentUserId = localStorage.getItem('userId')
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/messages")
      .then((response) => {
        //console.log(response);
        setPosts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteMessage = (id) => {
    axios
      .delete(`http://localhost:3001/api/messages/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        document.location.reload();
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <div>
        {posts
          .sort((a, b) => b.id - a.id)
          .map((post) => (
            <div className="card">
              <div className="card__head">
                <p style={{ display: "none" }}>{post.id}</p>
                <p className="card__head--name">{post.userId}</p>
                <p className="card__head--date">{post.createdAt}</p>
              </div>
              <div className="card__image">
                <img className="card__image--img" src={post.attachment} />
              </div>
              <div className="card__content">
                <p>{post.content}</p>
                {(isAdmin == "true" || post.userId == currentUserId) && (
                <Button
                  className="card__content--button"
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteMessage(post.id)}
                  style={{borderRadius: "0px 0px 18px 0px"}}
                >
                  SUPPRIMER
                </Button>
              )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Allpost;
