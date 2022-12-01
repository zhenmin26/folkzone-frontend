import React, { Component } from "react";
import { Grid, Typography } from "@mui/material";
import logo from "../../static/logo.png";

export default class Label extends Component {
  render() {
    return (
      <div>
        <Grid container sm={10} justifyContent="center" alignItems="center">
          <Grid item>
            <img src={logo} alt="Logo"></img>
          </Grid>
          <Grid
            item
            sm={8}
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            {/* <Grid item sm={9}> */}
              <Typography variant="h4" fontFamily={"Segoe UI"}>
                Welcome to Folkzone!
              </Typography>
            {/* </Grid> */}
            {/* <Grid item sm={9}> */}
              <Typography variant="h4" fontFamily={"Segoe UI"}>
                A place for folks
              </Typography>
            {/* </Grid> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}
