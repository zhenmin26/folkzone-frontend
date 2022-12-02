import React, { Component } from "react";

import {
  Typography,
  CardMedia,
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  TextField,
} from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";

// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export default class Post extends Component {
  constructor(props) {
    super(props);
    // console.log("index in post: " + props.index)
    this.state = {
      show: false,
      comments: this.props.article.comments,
      text: "",
      commentAuthor: "",
      commentId: ""
      // editCommentErrorText: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get("comment"))
    // const comment = data.get("comment");
    const comment = this.state.text;
    const req_data = {
      commentId: -1,
      username: localStorage.getItem("username"),
      text: comment,
    };
    fetch(url(`/articles/${this.props.article.pid}`), {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req_data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res.articles[0].comments);
        this.setState({
          comments: res.articles[0].comments,
          text: "",
        });
      });
  }

  editComment(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const new_comment = data.get("new_comment");
    // console.log(new_comment);
    // console.log(this.state.commentId);
    const req_data = {
      commentId: this.state.commentId,
      username: localStorage.getItem("username"),
      text: new_comment,
      curComment: "",
      backup_comment: ""
    };
    fetch(url(`/articles/${this.props.article.pid}`), {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req_data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.result == "success") {
          this.setState({
            comments: res.articles[0].comments,
            text: "",
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {this.props.article.image? (<CardMedia
            component="img"
            sx={{ width: 200, height: 200 }}
            image={this.props.article.image}
          />) : (<div></div>)}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{this.props.article.text}</Typography><br/>
            <Typography variant="h7">{this.props.article.author}</Typography><br/>
            <Typography variant="h7">{this.props.article.created}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
            <Button
              size="small"
              onClick={() => {
                this.setState({
                  show: !this.state.show,
                });
              }}
            >
              Comment
            </Button>
          </CardActions>
          <CardContent>
            <Typography>
              {this.state.show ? (
                <div>
                  {/* <span style={{color : "blue"}}>Comments:</span> */}
                  {this.state.comments.map((comment) => {
                    if(comment.author === localStorage.getItem("username")){
                      return (
                        <div>
                          <Box
                            component="form"
                            noValidate
                            onSubmit={this.editComment.bind(this)}
                          >
                            <TextField
                              name="new_comment"
                              id="new_comment"
                              variant="standard"
                              defaultValue={comment.text}
                              
                            />
                            <Button
                              type="submit"
                              onClick={() => {
                                this.setState({
                                  commentAuthor: comment.author,
                                  commentId: comment._id,
                                });
                              }}
                            >
                              Edit comment
                            </Button>
                          </Box>
                        </div>
                      );
                    }
                    else{
                      return (
                        <div>
                          <Box
                            component="form"
                            noValidate
                          >
                            <TextField
                              name="new_comment"
                              id="new_comment"
                              variant="standard"
                              defaultValue={comment.text}
                              disabled
                            />
                          </Box>
                        </div>
                      );
                    }
                    
                  })}
                  <Box
                    component="form"
                    noValidate
                    onSubmit={this.handleSubmit.bind(this)}
                  >
                    <TextField
                      name="comment"
                      // required
                      id="comment"
                      label="Comment here"
                      size="small"
                      item
                      value={this.state.text}
                      onChange={(e) => {
                        this.setState({
                          text: e.target.value,
                        });
                      }}
                      xs={6}
                    />
                    <Button
                      type="submit"
                      variant="text"
                      item
                      xs={6}
                      size="large"
                    >
                      Submit
                    </Button>
                  </Box>
                </div>
              ) : null}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
