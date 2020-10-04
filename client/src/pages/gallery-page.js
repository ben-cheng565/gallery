import React from 'react';

import { connect } from 'react-redux';
import {listGalleryItemsThunk, setShowOnlyFavourites, updateGalleryItemThunk} from '../redux/actions';
import { withRouter, useParams, useHistory, Switch, Route, Redirect } from 'react-router-dom';

import ImageGallery from '../components/image-gallery';

/**
 * A "page-level" component that's hooked into the Redux store to get the gallery items. When this component
 * mounts, it will also trigger an API call for the most recent items.
 */

class GalleryPage extends React.Component {

    constructor(props) {
        super(props);
        props.dispatchListGalleryItems();
    }

    handleImageChange(galleryItem) {
        this.props.history.push(`/${galleryItem._id}`);

    }

    handleClickFavourite(galleryItem) {
        this.props.dispatchUpdateGalleryItems({
            ...galleryItem,
            favourite: !galleryItem.favourite,
            modified: new Date()
        });
    }


    render() {
        const { galleryItems } = this.props;

        return (
            <Switch>
                <Route exact path="/">
                    <ImageGallery galleryItems={galleryItems} handleChangeImage={todo => this.handleImageChange(todo)}
                                  handleThumbnailClick={todo => this.handleClickFavourite(todo)} />
                </Route>
                <Route path="/:id">
                    <ImageGalleryWithParams galleryItems={galleryItems} handleChangeImage={todo => this.handleImageChange(todo)}
                                            handleThumbnailClick={todo => this.handleClickFavourite(todo)} />
                </Route>
                <Route path="*">
                    <Redirect to={`/${galleryItems[0] ? galleryItems[0]._id : ''}`} />
                </Route>
            </Switch>
        );
    }
}

function ImageGalleryWithParams({ galleryItems, handleChangeImage, handleThumbnailClick }) {
    const { id } = useParams();

    const galleryItem = galleryItems.find(t => t._id === id);
    const history = useHistory();
    if (galleryItem) {
        return <ImageGallery galleryItems={galleryItems} selectedId={id} handleChangeImage={handleChangeImage}
                             handleThumbnailClick={handleThumbnailClick} />
    }
    else {
        history.goBack();
        return <div></div>;

    }
}

/**
 * Give the ToDoManager access to the todos from the Redux store
 */
const mapStateToProps = state => {
    return {
        galleryItems: state.galleryItems
    }
}

/**
 * Give the ToDoManager access to these Redux actions which dispatch API calls
 */
const mapDispatchToProps = {
    dispatchListGalleryItems: listGalleryItemsThunk.thunk,
    dispatchUpdateGalleryItems: updateGalleryItemThunk.thunk

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GalleryPage));