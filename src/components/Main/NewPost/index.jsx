import React, { Component } from "react";
import { Button, TextField, Box, IconButton, Grid, Card } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  getDefaultState = () => {
    return { text: "" };
  };

  handleCancel() {
    this.setState(this.getDefaultState());
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

  handleSubmit(event) {
    // console.log(this.file)
    if (this.props.onClick) {
      this.props.onClick(this.state.text, this.file);
    }
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
                <span>Choose a photo from your device</span>
                <br />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    type={"file"}
                    accept="image/*"
                    onChange={(e) => this.handleImageChange(e)}
                  ></input>
                  <PhotoCamera />
                </IconButton>
              </Card>
            </Grid>
            <Grid item xs="auto">
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
              <Button
                variant="outlined"
                onClick={this.handleCancel.bind(this)}
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={this.handleSubmit.bind(this)}
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}
