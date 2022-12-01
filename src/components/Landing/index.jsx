import React, { Component } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import Grid from "@mui/material/Grid";
import Label from "../Label";
import store from "../../redux/store"

export class Landing extends Component {
  constructor(props) {
    super(props);
    // set posts and all users to localstorage
    // this.getHelloWorld()
    // this.getAllUsers()
    // this.getAllPosts()
  }

  getHelloWorld(){
    fetch("http://localhost:3000/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // mode: 'no-cors'
    }).then(response => {
      return response.json()
    }).then(
      data => console.log(data)
    )
  }

  getAllUsers(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        // get all users
        store.dispatch({ type: "getAllUser", data: json });
        store.dispatch({ type: "changeLoginStatus", data: false});
      });
  }

  getAllPosts(){
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        // get all posts
        store.dispatch({ type: "getAllPost", data: json });
        store.dispatch({ type: "getAllPostsInUser", data: json});
      });
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Label />
        </Grid>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={4} alignItems="center">
            <Register />
          </Grid>
          <Grid item xs={4} alignItems="center">
            <Login />
          </Grid>
        </Grid>
      </div>
    );
  }
}
