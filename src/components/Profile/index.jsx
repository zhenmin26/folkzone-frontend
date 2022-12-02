import React, { Component } from "react";
// import Main from "../Main";
// import { Link } from "react-router-dom";
import Label from "../Label";
import {
  Button,
  Avatar,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  Container,
} from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import store from "../../redux/store";
import { Link } from "react-router-dom";
import store from "../../redux/store";

// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export class Profile extends Component {
  constructor(props) {
    // console.log("profile");
    // console.log()
    super(props);
    this.state = {
      login: store.getState().userReducer.login,
      username: localStorage.getItem("username"),
      displayName: "",
      email: "",
      phone: "",
      zipcode: "",
      password: "",
      avatar: "https://source.unsplash.com/random",
      usernameErrorText: "", // cannot be empty
      phoneErrorText: "",
      emailErrorText: "",
      zipcodeErrorText: "",
      pwdErrorText: "",
    };
    this.getProfile();
  }

  // get user email, zipcode, and phone
  getProfile() {
    const username = localStorage.getItem("username");
    fetch(url(`/email/${username}`), {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        // console.log(res)
        return res.json();
      })
      .then((res) => {
        this.setState({
          email: res.email,
        });
      });
    fetch(url(`/zipcode/${username}`), {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        // console.log(res)
        return res.json();
      })
      .then((res) => {
        this.setState({
          zipcode: res.zipcode,
        });
      });
    fetch(url(`/phone/${username}`), {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        // console.log(res)
        return res.json();
      })
      .then((res) => {
        this.setState({
          phone: res.phone,
        });
      });
    fetch(url(`/avatar/${username}`), {
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
          avatar: res.avatars[0].avatar,
        });
      });
  }

  checkPhone(event) {
    // console.log("Checking phone");
    let phonePattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    if (
      event.target.value !== "" &&
      phonePattern.test(event.target.value) === false
    ) {
      this.setState({ phoneErrorText: "Invalid format" });
    } else {
      this.setState({ phoneErrorText: "" });
    }
  }

  checkEmail(event) {
    // console.log("Checking email");
    let emailPattern = /(\w+\.?\w*)\+?\w*@\w+\.?\w*\.[a-z]+/;
    if (
      event.target.value !== "" &&
      emailPattern.test(event.target.value) === false
    ) {
      this.setState({ emailErrorText: "Invalid format" });
    } else {
      this.setState({ emailErrorText: "" });
    }
  }

  checkZipcode = (event) => {
    // console.log("Checking zipcode");
    let zipPattern = /^[0-9]{5}$/;
    if (
      event.target.value !== "" &&
      zipPattern.test(event.target.value) === false
    ) {
      this.setState({ zipcodeErrorText: "Invalid format" });
    } else {
      this.setState({ zipcodeErrorText: "" });
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    // get register data
    const data = new FormData(event.currentTarget);

    let phonePattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    let emailPattern = /(\w+\.?\w*)\+?\w*@\w+\.?\w*\.[a-z]+/;
    let zipPattern = /[0-9]{5}$/;

    if (data.get("name") !== "" && data.get("name") !== this.state.username) {
      this.setState({ username: data.get("name") });
    }

    if (data.get("phone") !== "") {
      if (phonePattern.test(data.get("phone"))) {
        let phoneUpdate = {
          username: localStorage.getItem("username"),
          phone: data.get("phone"),
        };
        fetch(url("/phone"), {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(phoneUpdate),
          // mode: 'no-cors'
        })
          .then((res) => {
            // console.log(res)
            return res.json();
          })
          .then((res) => {
            this.setState({ phone: res.phone });
          });
      } else {
        this.setState({ phoneErrorText: "Invalid format" });
      }
    }
    if (data.get("email") !== "") {
      if (emailPattern.test(data.get("email"))) {
        let emailUpdate = {
          username: localStorage.getItem("username"),
          email: data.get("email"),
        };
        fetch(url("/email"), {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailUpdate),
          // mode: 'no-cors'
        })
          .then((res) => {
            // console.log(res)
            return res.json();
          })
          .then((res) => {
            this.setState({ email: res.email });
          });
      } else {
        this.setState({ emailErrorText: "Invalid format" });
      }
    }
    if (data.get("zipcode") !== "") {
      if (zipPattern.test(data.get("zipcode"))) {
        let zipcodeUpdate = {
          username: localStorage.getItem("username"),
          zipcode: data.get("zipcode"),
        };
        fetch(url("/zipcode"), {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(zipcodeUpdate),
          // mode: 'no-cors'
        })
          .then((res) => {
            // console.log(res)
            return res.json();
          })
          .then((res) => {
            this.setState({ zipcode: res.zipcode });
          });
      } else {
        this.setState({ zipcodeErrorText: "Invalid format" });
      }
    }
    if (data.get("password") != "") {
      let pwdUpdate = {
        username: localStorage.getItem("username"),
        password: data.get("password"),
      };
      fetch(url("/password"), {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pwdUpdate),
        // mode: 'no-cors'
      })
        .then((res) => {
          // console.log(res)
          return res.json();
        })
        .then((res) => {
          if (res.result == "success") {
            this.setState({ password: data.get("password") });
          }
        });
    }
  }

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    reader.onloadend = () => {
      this.preview = reader.result;
      this.forceUpdate();
    };
    // console.log(event.target.files.length);
    if (event.target.files.length !== 0) {
      this.file = event.target.files[0];
      // console.log(this.file);
      reader.readAsDataURL(this.file);
    }
  }

  handleAvatarUpload() {
    let payload = new FormData();
    payload.append("image", this.file);

    fetch(url("/avatar"), {
      credentials: "include",
      method: "PUT",
      credentials: "include",
      body: payload,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          avatar: res.avatar,
        });
      });
  }

  render() {
    if (this.state.login) {
      return (
        <Container>
          <Grid justifyContent="center" alignItems="center">
            <Button variant="text">
              <Link to="/main">Go to main page</Link>
            </Button>
          </Grid>
          <Grid container xs={12}>
            <Grid
              item
              xs={6}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <Avatar src={this.state.avatar} />
              </Grid>
              <Grid item>
                {/* <Box> */}
                <Button
                  variant="outlined"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => this.handleImageChange(e)}
                  />
                </Button>
                <Button onClick={this.handleAvatarUpload.bind(this)}>
                  Upload
                </Button>
                {/* </Box> */}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Label />
            </Grid>
          </Grid>
          <Divider />
          <Grid container xs={12}>
            {/* Current info */}
            <Grid item xs={6}>
              <CardContent>
                <Typography sx={{ fontSize: 35 }} color="text.first">
                  Current information
                </Typography>
                <Typography sx={{ fontSize: 25 }} color="text.secondary">
                  Username: {this.state.username}
                </Typography>
                {/* <Typography sx={{ fontSize: 25 }} color="text.secondary">
                  Display name: {this.state.displayName}
                </Typography> */}
                <Typography sx={{ fontSize: 25 }} color="text.secondary">
                  Email: {this.state.email}
                </Typography>
                <Typography sx={{ fontSize: 25 }} color="text.secondary">
                  Phone: {this.state.phone}
                </Typography>
                <Typography sx={{ fontSize: 25 }} color="text.secondary">
                  Zipcode: {this.state.zipcode}
                </Typography>
                {/* <Typography sx={{ fontSize: 25 }} color="text.secondary">
                  Password: {this.state.password.replace(/./g, "*")}
                </Typography> */}
              </CardContent>
            </Grid>
            {/* Update info */}
            <Grid item xs={6}>
              {/* name, email, phone, zop, password, upload button */}
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit.bind(this)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {/* <Grid item xs={12}>
                    <TextField
                      name="name"
                      // required
                      id="name"
                      label="Username"
                      autoComplete="name"
                      autoFocus
                      fullWidth
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      // required
                      fullWidth
                      id="phone"
                      label="Phone number"
                      name="phone"
                      onChange={this.checkPhone.bind(this)}
                      helperText={this.state.phoneErrorText}
                      error={this.state.phoneErrorText === "Invalid format"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={this.checkEmail.bind(this)}
                      helperText={this.state.emailErrorText}
                      error={this.state.emailErrorText === "Invalid format"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // required
                      fullWidth
                      id="zipcode"
                      label="Zip code"
                      name="zipcode"
                      autoComplete="zipcode"
                      onChange={this.checkZipcode.bind(this)}
                      helperText={this.state.zipcodeErrorText}
                      error={this.state.zipcodeErrorText === "Invalid format"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Upload information
                </Button>
              </Box>
            </Grid>
          </Grid>
          {/* <Grid>
            <Link to="/main" element={<Main />}>Go to main page</Link>
          </Grid> */}
        </Container>
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
