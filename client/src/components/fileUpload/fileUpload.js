import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createGalleryItemThunk } from "../../redux/actions";
import { connect } from "react-redux";

import UploadProgress from "./uploadProgress";

import "./fileUpload.css";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
    };
  }

  //check the number of files
  maxSelectedFile = (event) => {
    let files = event.target.files;
    if (files.length > 1) {
      event.target.value = null;
      //alert("Maximum 3 files can be uploaded at a time");
      toast.warn("Maximum 1 files can be uploaded at a time");
      return false;
    }
    return true;
  };

  //check the type of files
  checkMimeType = (event) => {
    let files = event.target.files;
    let err = [];
    const types = ["image/jpeg", "image/png", "image/gif"];

    for (var i = 0; i < files.length; i++) {
      if (types.every((type) => files[i].type !== type)) {
        err[i] = files[i].type + " is not a supported format\n";
      }
    }
    for (let e = 0; e < err.length; e++) {
      toast.warn(err[e]);
    }
    if (err.length !== 0) {
      event.target.value = null;
      return false;
    }
    return true;
  };

  //check the size of files
  checkFileSize = (event) => {
    let files = event.target.files;
    let err = [];
    const fileLimit = 1024 * 1024 * 5;
    for (let f = 0; f < files.length; f++) {
      if (files[f].size > fileLimit) {
        err[f] = "The size of " + files[f].name + " is too big!\n";
      }
    }
    for (let e = 0; e < err.length; e++) {
      toast.warn(err[e]);
    }
    if (err.length !== 0) {
      event.target.value = null;

      return false;
    }
    return true;
  };

  onChangeHandler = (event) => {
    if (
      this.maxSelectedFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      this.setState({
        selectedFile: event.target.files,
        loaded: 0,
      });
    }
  };

  onClickhandler = () => {
    const data = new FormData();
    for (let d = 0; d < this.state.selectedFile.length; d++) {
      data.append("file", this.state.selectedFile[d]);
    }

    axios
      .post("http://localhost:10000/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        // console.log(res.data.filePath);
        const newItem = {
          title: "upload",
          imageUrl: `/images/${res.data.filePath}`,
          thumbnailUrl: `/images/thumbnails/${res.data.filePath}`,
          created: new Date(),
          favourite: false,
        };
        this.props.dispatchCreateGalleryItems(newItem);
        toast.success("Upload succeffully!");
      })
      .catch((err) => {
        toast.error("Upload failed!");
      });
  };

  render() {
    return (
      <>
        <div>
          <ToastContainer />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md">
              <div className="form-group files">
                <label>Upload Your Image </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  // multiple //multiple files
                  onChange={this.onChangeHandler}
                ></input>
              </div>
              <div className="load-progress">
                <UploadProgress loaded={this.state.loaded}></UploadProgress>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={this.onClickhandler}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// export default FileUpload;

/**
 * Give the ToDoManager access to the todos from the Redux store
 */
const mapStateToProps = (state) => {
  return {
    galleryItems: state.galleryItems,
  };
};

/**
 * Give the ToDoManager access to these Redux actions which dispatch API calls
 */
const mapDispatchToProps = {
  dispatchCreateGalleryItems: createGalleryItemThunk.thunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
