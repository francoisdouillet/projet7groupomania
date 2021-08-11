import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import theme from "../../hooks/colors";
import { ThemeProvider } from "@material-ui/styles";
import { post } from "../../../../back end/routes/message";

const Allpost = () => {
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

    const isAdmin = localStorage.getItem('isAdmin')
    const userId = localStorage.get('userId')

  
    if(isAdmin === true | userId === post.userId) {
      return true
    } else {
      return false
    }
  


  return (
    <div>
      <ThemeProvider theme={theme}>
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteMessage(post.id)}
                >
                  SUPPRIMER
                </Button>
              </div>
            </div>
          ))}
      </ThemeProvider>
    </div>
  );
};

export default Allpost;
