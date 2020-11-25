import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import GalleryPage from "./pages/gallery-page";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ImageIcon from "@material-ui/icons/Image";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { setShowOnlyFavourites } from "./redux/actions";
import state from "./redux/reducers";
import { withStyles } from "@material-ui/core/styles";
/**
 * Main app component. Hooks up the Redux store and provides the app bar. The main app logic is all handled
 * within the ToDoManager.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, showOnlyFavourites } = this.props;
    //console.log(useStyles());
    return (
      <Router>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <ImageIcon fontSize="large" className={classes.icon} />
              <Typography variant="h6" className={classes.title}>
                Yet Another Image Gallery
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                    checked={state.config}
                    onChange={(event) =>
                      this.props.dispatchSetShowOnlyFavourites(
                        event.target.checked
                      )
                    }
                    color="secondary"
                  />
                }
                label="Show only favourites"
              />
            </Toolbar>
          </AppBar>
          <div className={classes.container}>
            <GalleryPage />
          </div>
        </MuiPickersUtilsProvider>
      </Router>
    );
  }
}

//const useStyles = makeStyles((theme) => ({
const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  appBar: {
    marginBottom: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr",
  },
});

const mapStateToProps = (state) => {
  return {
    showOnlyFavourites: state.config.showOnlyFavourites,
  };
};

/**
 * Give the ToDoManager access to these Redux actions which dispatch API calls
 */
const mapDispatchToProps = {
  dispatchSetShowOnlyFavourites: setShowOnlyFavourites,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
