import React, { Component } from "react";
import User from "./User";
import Label from "../Label";
import Friend from "./Friend";
// import NewPost from "./NewPost";
// import SearchBar from "./SearchBar/";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Post from "./Post";
import Container from "@mui/material/Container";

import {
  // Typography,
  Stack,
  Divider,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  getListItemSecondaryActionClassesUtilityClass,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import store from "../../redux/store";
import { Link } from "react-router-dom";
import { UnfoldLessTwoTone } from "@mui/icons-material";
import NewPost from "./NewPost";

// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      articles: [],
      addFriendError: "",
    };
  }

  componentDidMount() {
    this.getFollowers();
  }

  getFollowers() {
    const username = localStorage.getItem("username");
    fetch(url(`/following/${username}`), {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          followers: res.following,
        });
        // get posts
        this.getArticles();
      });
  }

  getArticles() {
    // const username = localStorage.getItem("username");
    console.log("get articles")
    fetch(url("/articles"), {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res.articles);
        const sorted_articles = res.articles;
        sorted_articles.sort(function (a, b) {
          var dateA = new Date(a.created).getTime();
          var dateB = new Date(b.created).getTime();
          // console.log(dateA)
          return dateA < dateB ? 1 : -1;
        });
        // console.log(sorted_articles);
        this.setState({
          articles: sorted_articles,
        });
      });
  }

  onChangeState(followers) {
    // console.log(followers);
    this.setState({
      followers,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // get new friend username
    const data = new FormData(event.currentTarget);
    const user = data.get("friend");
    fetch(url(`/following/${user}`), {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        if (res.result == "No matched items!") {
          this.setState({
            addFriendError: "Invalid friend name",
          });
        } else {
          this.setState({
            followers: res.following,
          });
          this.getArticles();
        }
      });
  }

  handleUnfollow(username) {
    // get new friend username
    fetch(url(`/following/${username}`), {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.result == "No matched items!") {
          this.setState({
            addFriendError: "Invalid friend name",
          });
        } else {
          this.setState({
            followers: res.following,
          });
          this.getArticles();
        }
      });
  }

  handleAddPost(text, img) {
    let posts = this.state.articles;
    let payload;
    if (img) {
      console.log("add post");
      payload = new FormData();
      payload.append("text", text);
      payload.append("image", img);
      payload.append("comments", []);
      fetch(url("/article"), {
        credentials: "include",
        method: "POST",
        body: payload,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          const new_article = res.article;
          posts.unshift(new_article);
          this.setState({
            articles: posts,
          });
          // this.getArticles()
        });
    }
    // text only
    else {
      let new_article = {
        text: text,
        comments: [],
      };
      // console.log(new_article);
      fetch(url("/article"), {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_article),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          const new_article = res.article;
          posts.unshift(new_article);
          this.setState({
            articles: posts,
          });
          // this.getArticles();
        });
    }
  }

  render() {
    return (
      <div>
        <Button
          variant="text"
          onClick={() => {
            console.log("user log out");
            // localStorage.setItem("login", false);
            store.dispatch({ type: "changeLoginStatus", data: false });
            this.setState({
              login: false,
            });
          }}
        >
          {/* Log out */}
          <Link to="/">Log out</Link>
        </Button>
        <Button variant="text">
          {/* Profile */}
          <Link to="/profile">Profile</Link>
        </Button>
        <Grid container spacing={2}>
          <Grid>
            <User />
            {/* frinds */}
            {this.state.followers.map((user) => {
              return (
                <div>
                  <Friend username={user} key={user} onRemoveFriend={this.onChangeState} />
                  <Button
                    type="submit"
                    variant="outlined"
                    onClick={() => {
                      this.handleUnfollow(user);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            <Box component="form" onSubmit={this.handleSubmit.bind(this)}>
              <TextField
                name="friend"
                // required
                id="friend"
                label="New Friend"
                fullWidth
                value={this.state.friendInput}
                onChange={(e) => {
                  this.setState({ friendInput: e.target.value });
                }}
                helperText={this.state.addFriendError}
                error={this.state.addFriendError === "Invalid friend name"}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                Add
              </Button>
            </Box>
          </Grid>

          <Grid>
            {/* New post */}
            <Grid>
              <NewPost onClick={this.handleAddPost.bind(this)} />
            </Grid>
            {/* Search */}
            <Box
              component="form"
              // onSubmit={this.handleSearch.bind(this)}
            >
              <Grid
                container
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={9}>
                  <TextField
                    margin="normal"
                    // fullWidth
                    id="search"
                    label="Search post"
                    name="search"
                    fullWidth
                    // sx={{ width: 830 }}
                    // onChange={(event) => {
                    //   // console.log(event.target.value)
                    //   if (event.target.value === "") {
                    //     this.setState({
                    //       show_cards: [1, 2, 3],
                    //     });
                    //   }
                    // }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button type="submit">
                    <SearchIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {/* Articles */}
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                {this.state.articles.map((article) => {
                  return (
                    <Grid item xs={12} sm={6} md={4}>
                      <Post
                        key={article}
                        article={article}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}
