import React, { Component } from 'react'
import Dropzone from 'react-dropzone';

import classes from './AlbumEditor.css';

class AlbumEditor extends React.Component {

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
            <div className='albumEditor'>
                <div className='bigtext inline'>{ this.props.albumData.title }</div>
                <div className='albumClose' onClick={ () => this.props.closeHandler() }>CLOSE</div>
                { this.state.photos.map( item => {
                        return (
                            <div key={ item.id } className='photo'>
                                <p className='bigtext'>{ item.title }</p>
                                <p>{ item.description }</p>
                                <p><img src={ "photos/" + this.props.albumData.url + "/" + item.url } /></p>
                            </div>
                        )
                    }
                )}
                <Dropzone className='imageDropZone' disablePreview={true} activeStyle={{backgroundColor: '#aaffbb'}} multiple={true} accept="image/*, video/*" onDrop={ (files) => this.props.addPhotosHandler(files, this) }>
                    Drop new photos here
                </Dropzone>
            </div>
        );
    }

}

export default AlbumEditor;