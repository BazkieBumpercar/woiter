import React from 'react'

import classes from './css/AlbumViewer.css';

import '../assets/lightbox2/js/lightbox.js';
import '../assets/lightbox2/css/lightbox.css';

class AlbumViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
    }

    componentDidMount() {
        this.fetchPhotos(this.props.albumData.id);
    }

    fetchPhotos(albumId) {
        fetch('api/photos/' + albumId)
        .then(response => { return response.json(); } )
        .then(photos => {
                this.setState({ photos: photos })
                }
        );
    }

    render() {
        return (
            <div className='albumViewer'>
                <h2>{ this.props.albumData.title }</h2>
                <h3>{ this.props.albumData.description }</h3>
                <br />
                <div className='albumClose' onClick={ () => this.props.closeHandler() }>CLOSE</div>
                { this.state.photos.map(photo => {
                    return (
                        <div key={ photo.id } className='photo'>
                            <h3>{ photo.title }</h3>
                            <p>{ photo.description }</p>
                            <p>
                                <a href={ "photos/" + this.props.albumData.url + "/" + photo.url } data-lightbox={ photo.id } data-title={ photo.name }>
                                    <img className="image" src={ "photos/" + this.props.albumData.url + "/" + photo.url } />
                                </a>
                            </p>
                        </div>
                    );
                }) }
            </div>
        );
    }

}

export default AlbumViewer;