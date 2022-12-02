import React, { Component } from "react";
import { Avatar, Typography, Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import store from "../../../redux/store";

// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export default class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      avatar: "https://source.unsplash.com/random",
      status: "",
      // followers: [],
    };
    this.getHeaderline();
  }

  getHeaderline() {
    const username = this.state.username;
    fetch(url(`/headline/${username}`), {
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
          status: res.headline,
        });
      });
  }

  handleClick() {
    // // console.log("remove remove remove")
    const delUser = this.state.username;
    const user = {
      username: localStorage.getItem("username"),
    };
    // // return username
    fetch(url(`/following/${delUser}`), {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log("res", res)
        this.setState({
          followers: res.following,
        });
        return res.following;
      });
  }

  render() {
    return (
      <div>
        <Container>
          <Grid container direction="column">
            {/* uppser part */}
            <Grid
              item
              container
              xs={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {/* left part */}
              <Grid
                item
                xs={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Avatar src={this.state.avatar} />
                </Grid>
                <Grid item>
                  <Typography sx={{ fontSize: 25 }} color="text.first">
                    {this.props.username}
                  </Typography>
                </Grid>
              </Grid>
              {/* right part */}
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 20 }} color="text.secondary">
                  {this.state.status}
                </Typography>
              </Grid>
            </Grid>
            {/* lower part */}
            <Grid
              item
              container
              xs={12}
              // direction="row"
              justifyContent="center"
              alignItems="center"
            ></Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
