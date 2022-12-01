import React, { Component } from "react";
import User from "./User";
import Label from "../Label";
import Friend from "./Friend";
// import NewPost from "./NewPost";
// import SearchBar from "./SearchBar/";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Post from "./Post";
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
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import store from "../../redux/store";
import { Link } from "react-router-dom";

export default class Main extends Component {
  constructor(props) {
    // console.log(store.getState().userReducer)
    super(props);
    // console.log(store.getState().userReducer.friendUserIds)
    // console.log(store.getState().userReducer.postsInUser)
    this.state = {
      login: store.getState().userReducer.login,
      show_cards: [1, 2, 3],
      allPosts: store.getState().userReducer.allPostsInUser,
      posts: store.getState().userReducer.postsInUser,
      curUser: store.getState().userReducer.curUser,
      allUsers: store.getState().userReducer.allUsers,
      friendUserIds: store.getState().userReducer.friendUserIds,
      friends: store.getState().userReducer.friends,
      searchValue: "",
      friendInput: "",
      text: "",
      addFriendError: ""
    };
  }

  randomDate(start, end) {
    var d = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      ),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    // return [month, day, year].join("/");
    return [year, month, day].join("-");
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDay();
    return [year, month, day].join("-");
  }

  onClickBack = () => {
    // console.log("back")
    const length = this.state.posts.length;
    let prev_show_cards = this.state.show_cards;
    let new_show_cards = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
      if (prev_show_cards[i] === 1) {
        prev_show_cards[i] = length;
        new_show_cards[i] = prev_show_cards[i];
        continue;
      }
      new_show_cards[i] = (prev_show_cards[i] - 1) % length;
    }
    // console.log(new_show_cards)
    this.setState({
      show_cards: new_show_cards,
    });
  };

  onClickForward = () => {
    // console.log("forward")
    const length = this.state.length; // 10
    let prev_show_cards = this.state.show_cards;
    // console.log(prev_show_cards);
    let new_show_cards = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
      if (prev_show_cards[i] === 9) {
        prev_show_cards[i] = 10;
        new_show_cards[i] = prev_show_cards[i];
        continue;
      }
      new_show_cards[i] = (prev_show_cards[i] + 1) % length;
    }
    // console.log(new_show_cards)
    this.setState({
      show_cards: new_show_cards,
    });
  };

  getDefaultState = () => {
    return { text: "" };
  };

  handleCancel() {
    this.setState(this.getDefaultState());
  }

  handleSubmit(event) {
    event.preventDefault();
    // get new friend username
    const data = new FormData(event.currentTarget);
    // console.log("handle submit", data.get("friend"));
    let res = false;
    this.state.allUsers.forEach((user) => {
      if (user.username === data.get("friend")) {
        // add friend
        store.dispatch({ type: "addFriend", data: user.id });
        this.setState({
          friendUserIds: store.getState().userReducer.friendUserIds,
          friendInput: "",
        });
        // add friend's posts
        // console.log("adding posts for new friend")
        for (var j = 0; j < this.state.allPosts.length; j += 10) {
          if (this.state.allPosts[j].userId === user.id) {
            let friend_posts = this.state.allPosts.slice(j, j + 10);
            friend_posts.forEach((post) => {
              post.date = this.randomDate(new Date(2012, 0, 1), new Date());
              post.username = user.username;
            });
            // console.log("friend posts", friend_posts);
            // sort posts by date
            friend_posts.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });
            // store.dispatch({ type: "addPostsInUser", data: friend_posts });
            this.setState({
              posts: this.state.posts.concat(friend_posts)
            })
            break;
          }
        }
        res = true
      }
    });
    // console.log(res)
    if(res == false){
      this.setState({
        addFriendError: "Invalid friend name"
      })
    }
  }

  handleSearch(event) {
    event.preventDefault();
    // get new friend username
    const data = new FormData(event.currentTarget);
    const search_value = data.get("search");
    // console.log(data.get("search"));
    if (search_value === "") {
      this.setState({
        show_cards: [1, 2, 3],
      });
    } else {
      // console.log(this.state.posts)
      let posts = this.state.posts;
      let shows = [];
      posts.forEach((post) => {
        if (
          post.author.indexOf(search_value) !== -1 ||
          post.body.indexOf(search_value) !== -1
        ) {
          shows.push(post.id);
        }
      });
      this.setState({
        show_cards: shows,
      });
    }
  }

  onChangeState(new_state) {
    this.setState(new_state);
  }

  addPost(event) {
    event.preventDefault();
    // get new friend username
    const data = new FormData(event.currentTarget);
    // console.log(data.get("postContent"))
    let new_posts = {
      id: 101,
      userId: this.state.curUser.id,
      body: data.get("postContent"),
      title: "new post",
      date: this.getCurrentDate(),
    };
    this.setState({
      posts: [new_posts].concat(this.state.posts),
    });
  }

  render() {
    if (this.state.login) {
      // console.log("re-render main");
      return (
        <div>
          <Button
            variant="text"
            onClick={() => {
              console.log("user log out")
              // localStorage.setItem("login", false);
              store.dispatch({type: "changeLoginStatus", data: false})
              store.dispatch({type: "getUser", data: {}})
              store.dispatch({type: "getFriendUserId", data: []})
              store.dispatch({type: "getFriends", data: []})
              store.dispatch({type: "getpostsInUser", data: []})
              this.setState({
                login : false
              })
            }}
          >
            {/* Log out */}
            <Link to="/">Log out</Link>
          </Button>
          <Button variant="text">
            {/* Profile */}
            <Link to="/profile">Profile</Link>
          </Button>
          {/* <Container> */}
          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {/* user info */}
              <Grid>
                <User />
                <Divider>
                  <Typography variant="h5" color="primary">
                    Followers
                  </Typography>
                </Divider>
              </Grid>

              {/* frinds */}
              <Box component="form" onSubmit={this.handleSubmit.bind(this)}>
                <Grid>
                  {
                  this.state.friendUserIds.map((user) => {
                    // console.log(userId)
                    if(user){
                      return (
                        <Grid spacing={2} direction="column" container>
                          <Grid item>
                            <Friend
                              userInfo={user}
                              onRemoveFriend={this.onChangeState.bind(this)}
                            />
                          </Grid>
                          <Grid item>
                            <Divider />
                          </Grid>
                        </Grid>
                      );
                    }
                  })}
                </Grid>
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
                  helperText = {this.state.addFriendError}
                  error = {this.state.addFriendError === "Invalid friend name"}
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
            <Grid item xs={9}>
              <Grid container xs={12} spacing={2}>
                <Grid item xs={5}>
                  {/* new post */}
                  <div>
                    <Box component="form" onSubmit={this.addPost.bind(this)}>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <Card>
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input hidden accept="image/*" type="file" />
                              <PhotoCamera />
                            </IconButton>
                          </Card>
                        </Grid>
                        <Grid item xs="auto">
                          <TextField
                            id="postContent"
                            name="postContent"
                            multiline
                            // defaultValue="Your post here"
                            label="Post content"
                            value={this.state.text}
                            onChange={(event) => {
                              this.setState({ text: event.target.value });
                            }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="outlined"
                            onClick={this.handleCancel.bind(this)}
                            fullWidth
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant="outlined" fullWidth type="submit">
                            Post
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <Label />
                </Grid>
              </Grid>
              {/* Search bar */}
              <Grid>
                {/* <Grid item columns={3}>
                  <Typography>Search here</Typography>
                </Grid> */}

                {/* <SearchBar onSearch={this.onSearchPost.bind(this)}/> */}
                <Box component="form" onSubmit={this.handleSearch.bind(this)}>
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
                        onChange={(event) => {
                          // console.log(event.target.value)
                          if (event.target.value === "") {
                            this.setState({
                              show_cards: [1, 2, 3],
                            });
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button type="submit">
                        <SearchIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* Post area */}
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                xs={12}
              >
                <Grid item>
                  <ArrowBackIosIcon
                    fontSize="large"
                    onClick={this.onClickBack.bind(this)}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    {/* {this.state.show_cards.map((show_card) => <Post key={show_card} />)} */}
                    {/* {this.state.show_cards.map((show_card) => <Post key={show_card} />)} */}
                    {this.state.show_cards.map((card_index) => {
                      // console.log(this.state.posts.length)
                      for (var i = 0; i < this.state.posts.length; i++) {
                        if (i === card_index - 1) {
                          return (
                            <Post
                              cur_post={this.state.posts[i]}
                              author={this.state.posts[i]}
                            />
                          );
                        }
                      }
                    })}
                  </Stack>
                </Grid>
                <Grid item>
                  <ArrowForwardIosIcon
                    fontSize="large"
                    onClick={this.onClickForward.bind(this)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* </Container> */}
        </div>
      );
    } else {
      return (
        <div>
          Please log in first
          <Button variant="text">
            {/* Profile */}
            <Link to="/">Go to landing page</Link>
          </Button>
        </div>
      );
    }
  }
}
