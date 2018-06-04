import React, { Component } from 'react'

import classes from './css/AlbumViewer.css';

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
                  });
    }

    render() {
        return (
            <div className='albumViewer'>
                <h2>{ this.props.albumData.title }</h2>
                <div className='albumClose' onClick={ () => this.props.closeHandler() }>CLOSE</div>
                { this.state.photos.map(photo => {
                    return (
                        <div key={ photo.id } className='photo'>
                            <h3>{ photo.title }</h3>
                            <p>{ photo.description }</p>
                            <p><img className="image" src={ "photos/" + this.props.albumData.url + "/" + photo.url } /></p>
                        </div>
                    );
                }) }
            </div>
        );
    }

}

export default AlbumViewer;