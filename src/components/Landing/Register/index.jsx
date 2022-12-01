import React, { Component } from "react";
import {
  Button,
  TextField,
  // Avatar,
  Container,
  CssBaseline,
  Grid,
  Box,
  // Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import store from "../../../redux/store";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// const url = (path) => `https://folk-zone.herokuapp.com${path}`;
const url = (path) => `http://localhost:3000${path}`;

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameErrorText: "",
      phoneErrorText: "",
      emailErrorText: "",
      brithdateErrorText: "",
      zipcodeErrorText: "",
      pwdErrorText: "",
      login: false,
    };
  }

  checkUsername(event) {
    let usernamePattern = /^[a-zA-Z]+[a-zA-Z0-9]{0,}$/;
    if (usernamePattern.test(event.target.value)) {
      this.setState({ usernameErrorText: "" });
    } else if (event.target.value === "") {
      this.setState({ usernameErrorText: "Required field" });
    } else {
      this.setState({ usernameErrorText: "Invalid format" });
    }
  }

  checkPhone(event) {
    // console.log("Checking phone");
    let phonePattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    if (phonePattern.test(event.target.value)) {
      this.setState({ phoneErrorText: "" });
    } else if (event.target.value === "") {
      this.setState({ phoneErrorText: "Required field" });
    } else {
      this.setState({ phoneErrorText: "Invalid format" });
    }
  }

  checkBirthdate(event) {
    let birth = event.target.value;
    // console.log(birth);
    let today = new Date();
    let birthdate = birth.split("-");
    let year = birthdate[0];
    let month = birthdate[1];
    let day = birthdate[2];
    let age = today.getFullYear() - parseInt(year);
    let m = today.getMonth() + 1 - parseInt(month);
    if (m < 0) {
      age -= 1;
    }
    let d = today.getDate() - parseInt(day);
    if (m === 0 && d < 0) {
      age -= 1;
    }
    if (age < 18) {
      this.setState({ brithdateErrorText: "Age under 18" });
    } else {
      this.setState({ brithdateErrorText: "" });
    }
  }

  checkEmail(event) {
    // console.log("Checking email");
    let emailPattern = /(\w+\.?\w*)\+?\w*@\w+\.?\w*\.[a-z]+/;
    if (emailPattern.test(event.target.value)) {
      this.setState({ emailErrorText: "" });
    } else if (event.target.value === "") {
      this.setState({ emailErrorText: "Required field" });
    } else {
      this.setState({ emailErrorText: "Invalid format" });
    }
  }

  checkZipcode = (event) => {
    // console.log("Checking zipcode");
    let zipPattern = /^[0-9]{5}$/;
    if (zipPattern.test(event.target.value)) {
      this.setState({ zipcodeErrorText: "" });
    } else if (event.target.value === "") {
      this.setState({ zipcodeErrorText: "Required field" });
    } else {
      this.setState({ zipcodeErrorText: "Invalid format" });
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    // get register data
    const data = new FormData(event.currentTarget);
    // username
    if (data.get("name") === "") {
      this.setState({ usernameErrorText: "Required field" });
    }
    // phone
    if (data.get("phone") === "") {
      this.setState({ phoneErrorText: "Required field" });
    }
    // birthdate
    if (data.get("birthdate") === "") {
      this.setState({ brithdateErrorText: "Required field" });
    }
    // email
    if (data.get("email") === "") {
      this.setState({ emailErrorText: "Required field" });
    }
    // zipcode
    if (data.get("zipcode") === "") {
      this.setState({ zipcodeErrorText: "Required field" });
    }
    if (data.get("password") === "") {
      this.setState({ pwdErrorText: "Required field" });
    }
    if (data.get("confirmPassword") === "") {
      this.setState({ pwdErrorText: "Required field" });
    }
    if (
      data.get("password") !== "" &&
      data.get("confirmPassword") !== "" &&
      data.get("password") === data.get("confirmPassword")
    ) {
      let regUser = {
        username: data.get("name"),
        phone: data.get("phone"),
        dob: data.get("birthdate"),
        email: data.get("email"),
        zipcode: data.get("zipcode"),
        password: data.get("password"),
        // company: { catchPhrase: "Happy" },
      };
      //
      // store.dispatch({type: "getUser", data: new_user})

      fetch(url("/register"), {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regUser),
        // mode: 'no-cors'
      })
        .then((res) => {
          // console.log(res)
          return res.json();
        })
        .then((res) => {
          // console.log(res);
          if (res.result === "success") {
            store.dispatch({ type: "changeLoginStatus", data: true });
            store.dispatch({ type: "getFriends", data: [] })
            this.setState({
              login: true,
            });
            localStorage.setItem("username", data.get("username"));
          }
        });
    } else if (data.get("password") !== data.get("confirmPassword")) {
      this.setState({ pwdErrorText: "Password does not match" });
    } else {
      this.setState({ pwdErrorText: "Required field" });
    }
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
            noValidate
            onSubmit={this.handleSubmit.bind(this)}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            {/* <Typography component="h1" variant="h5">
              Sign up
            </Typography> */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  autoComplete="name"
                  autoFocus
                  onChange={this.checkUsername.bind(this)}
                  helperText={this.state.usernameErrorText}
                  error={
                    this.state.usernameErrorText === "Invalid format" ||
                    this.state.usernameErrorText === "Required field"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="displayName"
                  label="Display name"
                  name="displayName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone number"
                  name="phone"
                  onChange={this.checkPhone.bind(this)}
                  helperText={this.state.phoneErrorText}
                  error={
                    this.state.phoneErrorText === "Invalid format" ||
                    this.state.phoneErrorText === "Required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="birthdate"
                  label="Birth date"
                  type="date"
                  name="birthdate"
                  // defaultValue="1999-01-21"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.checkBirthdate.bind(this)}
                  helperText={this.state.brithdateErrorText}
                  error={
                    this.state.brithdateErrorText === "Age under 18" ||
                    this.state.brithdateErrorText === "Required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.checkEmail.bind(this)}
                  helperText={this.state.emailErrorText}
                  error={
                    this.state.emailErrorText === "Invalid format" ||
                    this.state.emailErrorText === "Required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zipcode"
                  label="Zip code"
                  name="zipcode"
                  autoComplete="zipcode"
                  onChange={this.checkZipcode.bind(this)}
                  helperText={this.state.zipcodeErrorText}
                  error={
                    this.state.zipcodeErrorText === "Invalid format" ||
                    this.state.zipcodeErrorText === "Required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={this.state.pwdErrorText}
                  error={
                    this.state.pwdErrorText === "Password does not match" ||
                    this.state.pwdErrorText === "Required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  helperText={this.state.pwdErrorText}
                  error={
                    this.state.pwdErrorText === "Password does not match" ||
                    this.state.pwdErrorText === "Required field"
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Container>
      );
    }
  }
}
