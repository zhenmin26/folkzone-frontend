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
import { UnfoldLessTwoTone } from "@mui/icons-material";

// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      addFriendError: "",
    };
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
        // get feed
        fetch(url(),{

        }).then().then()
      });
  }

  onChangeState(followers) {
    console.log(followers);
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
        console.log(res);
        if (res.result == "No matched items!") {
          this.setState({
            addFriendError: "Invalid friend name",
          });
        } else {
          this.setState({
            followers: res.following,
          });
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
        }
      });
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
            // store.dispatch({ type: "getUser", data: {} });
            // store.dispatch({ type: "getFriendUserId", data: [] });
            // store.dispatch({ type: "getFriends", data: [] });
            // store.dispatch({ type: "getpostsInUser", data: [] });
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

        <User />
        {/* frinds */}
        <Grid>
          {this.state.followers.map((user) => {
            return (
              <div>
                <Friend username={user} onRemoveFriend={this.onChangeState} />
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
        </Grid>
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

      </div>
    );
  }
}
