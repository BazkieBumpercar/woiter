import React, { Component } from 'react'

//import classes from '/app.css';
import classes from './AlbumViewer.css';

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
                <div className='bigtext inline'>{ this.props.albumData.title }</div>
                <div className='albumClose' onClick={ () => this.props.closeHandler() }>CLOSE</div>
                { this.state.photos.map( photo => {
                        return (
                            <div key={ photo.id } className='photo'>
                                <p className='bigtext'>{ photo.title }</p>
                                <p>{ photo.description }</p>
                                <p><img src={ "photos/" + this.props.albumData.url + "/" + photo.url } /></p>
                            </div>
                        )
                    }
                )}
            </div>
        );
    }

}

export default AlbumViewer;