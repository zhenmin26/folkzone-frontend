import React, { Component } from "react";
import {
  Box,
  TextField,
  Button,
  // Typography,
  // Avatar,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import { Navigate } from "react-router-dom";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import store from "../../../redux/store";
// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: store.getState().userReducer.login,
      usernameErrorText: "",
      passwordErrorText: "",
    };
  }

  getPosts(user) {
    let allPosts = store.getState().postReducer.allPosts;
    let posts;
    for (var j = 0; j < allPosts.length; j += 10) {
      if (allPosts[j].userId === user.id) {
        posts = allPosts.slice(j, j + 10);
        posts.forEach((post) => {
          post.date = this.randomDate(new Date(2012, 0, 1), new Date());
          post.username = user.username;
        });
        // console.log(posts);
        // sort posts by date
        posts.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        break;
      }
    }
    return posts;
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

  handleSubmit(event) {
    // console.log("login in")
    event.preventDefault();
    // get user data
    const data = new FormData(event.currentTarget);
    // console.log(data)
    let loginUser = {
      username: data.get("username"),
      password: data.get("login_password"),
    };
    // console.log(loginUser)
    fetch(url("/login"), {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.result === "success") {
          store.dispatch({ type: "changeLoginStatus", data: true });
          // store.dispatch({ type: "getFriends", data: [] })
          this.setState({
            login: true,
          });
          localStorage.setItem("username", data.get("username"));
        } else {
          // console.log(res);
          this.setState({
            passwordErrorText: "Wrong password",
          });
        }
        // this.setState({ login: true })
      });
    // store.getState().userReducer.allUsers.forEach((user) => {
    //   if (data.get("username") === "") {
    //     this.setState({ usernameErrorText: "Required field" });
    //     return;
    //   }
    // if (
    //   user.username === data.get("username") &&
    //   data.get("login_password") == user.address.street
    // ) {
    //   // console.log("Login successfully");
    //   // localStorage.setItem("curUser", JSON.stringify(user));
    //   // get current user
    //   store.dispatch({ type: "getUser", data: user });
    //   // get friend users
    //   const curId = user.id;
    //   let friendIds = new Array(3);
    //   let friends = new Array(3);
    //   for (var i = 1; i <= 3; i++) {
    //     if (curId + i == 10) {
    //       friendIds[i - 1] = 10;
    //       friends[i-1] = store.getState().userReducer.allUsers[9]
    //     } else {
    //       friendIds[i - 1] = (curId + i) % 10;
    //       friends[i-1] = store.getState().userReducer.allUsers[(curId + i) % 10 - 1]
    //     }
    //   }
    //   let allPosts = store.getState().postReducer.allPosts;
    //   let posts;
    //   for (var j = 0; j < allPosts.length; j += 10) {
    //     if (allPosts[j].userId === user.id) {
    //       posts = allPosts.slice(j, j + 10);
    //       posts.forEach((post) => {
    //         post.date = this.randomDate(new Date(2012, 0, 1), new Date());
    //         post.username = user.username;
    //       });
    //       // console.log(posts);
    //       // sort posts by date
    //       posts.sort(function (a, b) {
    //         return new Date(b.date) - new Date(a.date);
    //       });
    //       store.dispatch({ type: "getPosts", data: posts });
    //       store.dispatch({type: "getpostsInUser", data: posts})
    //       break;
    //     }
    //   }
    //   store.dispatch({ type: "getFriendUserId", data: friendIds });
    //   store.dispatch({ type: "getFriends", data: friends });
    //   this.setState({ login: true });
    //   store.dispatch({ type: "changeLoginStatus", data: true})
    // } else {
    //   this.setState({ passwordErrorText: "Wrong password" });
    // }
    // });
  }

  render() {
    if (this.state.login) {
      return <Navigate to="/main" />;
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            component="form"
            onSubmit={this.handleSubmit.bind(this)}
            noValidate
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                autoFocus
                helperText={this.state.usernameErrorText}
                error={this.state.usernameErrorText === "Required field"}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="login_password"
                label="Password"
                type="password"
                id="login_password"
                helperText={this.state.passwordErrorText}
                error={
                  this.state.passwordErrorText === "Wrong password" ||
                  this.state.passwordErrorText === "Required field"
                }
              />
              <Button
                type="login"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Grid>
          </Box>
          <Grid>
            <Button
              type="oauth"
              variant="contained"
              fullWidth
              onClick={() => {
                console.log("google login");
              }}
            >
              Google Login
            </Button>
          </Grid>
        </Container>
      );
    }
  }
}
