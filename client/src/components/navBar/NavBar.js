import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  makeStyles,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ImageIcon from "@material-ui/icons/Image";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { setShowOnlyFavourites } from "../../redux/actions";
import state from "../../redux/reducers";
import { withStyles } from "@material-ui/core/styles";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
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
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/add"
            >
              add more
            </Button>
          </Toolbar>
        </AppBar>
      </MuiPickersUtilsProvider>
    );
  }
}

// const useStyles = makeStyles((theme) => ({
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
)(withStyles(styles)(NavBar));
