import React, { Component } from "react";
import { Button, TextField, Box, IconButton, Grid, Card } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  getDefaultState = () => {
    return { text: "" };
  };

  handleCancel() {
    this.setState(this.getDefaultState());
  }

  render() {
    return (
      <div>
        <Box>
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
            <Grid item xs='auto'>
              <TextField
                id="outlined-multiline-static"
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
              <Button variant="outlined" onClick={this.handleCancel.bind(this)} fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth>Post</Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}
