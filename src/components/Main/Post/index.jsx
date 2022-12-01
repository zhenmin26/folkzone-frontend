import React, { Component } from "react";

import {
  Typography,
  CardMedia,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";

export default class Post extends Component {
  constructor(props) {
    super(props);
    // console.log("index in post: " + props.index)
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <div>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            sx={{ width: 200, height: 200 }}
            image="https://source.unsplash.com/random"
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {/* Heading */}
              {this.props.cur_post.id} -{this.props.cur_post.title}
            </Typography>
            <Typography variant="h6">
              by {this.props.author.username}
            </Typography>
            <Typography variant="h6">
              posted on {this.props.cur_post.date}
            </Typography>
            <Typography>
              {/* This is a media card. You can use this section to describe the
              content. */}
              {this.props.cur_post.body}
            </Typography>
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
                <div><span style={{color : "blue"}}>Comments: </span>
                { this.props.cur_post.body }
                { this.props.cur_post.title }
                </div>
              ) : null}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
