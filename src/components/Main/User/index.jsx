import React, { Component } from "react";
import {
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import store from "../../../redux/store";
import avatarPic from "../../../static/images/avatar/1.jpg";
import { render } from "@testing-library/react";

// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      status: "",
    };
    this.getHeaderline()
  }

  getHeaderline() {
    const username = localStorage.getItem("username");
    fetch(url(`/headline/${username}`), {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          status: res.headline,
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get("status"));
    const headlineUpdate = {
      username: localStorage.getItem("username"),
      headline: data.get("status"),
    };
    // console.log(headlineUpdate)
    fetch(url("/headline"), {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(headlineUpdate),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          status: res.headline
        });
      });
    // this.setState({
    //   status: data.get("status"),
    // });
    // store.dispatch({ type: "changeUserState", data: data.get("status") });
  }

  render() {
    return (
      <div>
        <Container>
          <Grid>
            {/* User information */}
            <Grid
              container
              xs={12}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid>
                <Avatar alt={this.state.username} src={avatarPic} />
              </Grid>
              <Grid>
                <Typography sx={{ fontSize: 25 }} color="text.first">
                  {this.state.username}
                </Typography>
              </Grid>
              <Grid>
                <Typography sx={{ fontSize: 20 }} color="text.secondary">
                  {this.state.status}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
              // spacing={20}
            >
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit.bind(this)}
              >
                <TextField
                  name="status"
                  // required
                  id="status"
                  label="Update here"
                  size="small"
                  item
                  // variant="standard"
                  xs={6}
                />
                <Button
                  type="submit"
                  variant="text"
                  item
                  xs={6}
                  size="large"
                >
                  Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
