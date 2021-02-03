import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import GalleryThumbnailsList from "./gallery-thumbnails-list";

import preloadImages from "../preload-images"; // Get these images into the browser cache

export default function ImageGallery({
  galleryItems,
  selectedId,
  handleChangeImage,
  handleThumbnailClick,
}) {
  const classes = useStyles();

  if (!galleryItems || !galleryItems[0]) {
    return <p>No items</p>;
  }

  // Force the gallery "large" images to be cached
  preloadImages(galleryItems.map((item) => item.imageUrl));

  let selectedItem = galleryItems.find((item) => item._id === selectedId);
  selectedItem = selectedItem || galleryItems[0];
  const imagePath = `https://image-gallery-backend.herokuapp.com${selectedItem.imageUrl}`;

  handleChangeImage = handleChangeImage || (() => null); // Prevent trying to call a nonexistant function

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.navButtonPanel}>
          <IconButton
            aria-label="previous"
            onClick={() =>
              handleChangeImage(getPrevious(galleryItems, selectedItem._id))
            }
          >
            <ArrowLeftIcon className={classes.navIcon} />
          </IconButton>
        </div>
        <img
          src={imagePath}
          className={classes.mainImage}
          alt={selectedItem.title}
        />
        <div className={classes.navButtonPanel}>
          <IconButton
            aria-label="next"
            onClick={() =>
              handleChangeImage(getNext(galleryItems, selectedItem._id))
            }
          >
            <ArrowRightIcon className={classes.navIcon} />
          </IconButton>
        </div>
      </div>
      <GalleryThumbnailsList
        galleryItems={galleryItems}
        selectedId={selectedItem._id}
        onThumbnailClick={(item) => handleThumbnailClick(item)}
      />
    </div>
  );
}

function getNext(galleryItems, itemId) {
  return get(galleryItems, itemId, 1);
}

function getPrevious(galleryItems, itemId) {
  return get(galleryItems, itemId, -1);
}

function get(galleryItems, itemId, offset) {
  const index = galleryItems.findIndex((item) => item._id === itemId) + offset;

  return galleryItems[Math.max(0, Math.min(index, galleryItems.length - 1))];
}

/**
 * Defines CSS classes with styles used by this component
 */
const useStyles = makeStyles((theme) => ({
  root: {
    // border: '1px solid red',
    display: "grid",
    gridTemplateRows: "1fr auto",
    gridTemplateColumns: "auto",
  },
  main: {
    // border: '1px solid red',
    margin: "auto", //items display center
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "auto 1fr auto",
    width: "1000px",
  },
  navButtonPanel: {
    // border: '1px solid blue',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: "1",
  },
  mainImage: {
    width: `calc(100% + ${2 * theme.spacing(4)}px)`,
    height: "100%",
    objectFit: "contain",
    marginLeft: -theme.spacing(4),
    marginRight: -theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    filter: "drop-shadow(0px 3px 3px rgba(128, 128, 128, 0.8))",
  },
  navIcon: {
    fontSize: "300%",
  },
}));
