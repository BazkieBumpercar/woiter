import React, { Component } from 'react'
import Dropzone from 'react-dropzone';

import classes_albumviewer from './AlbumViewer.css';
import classes_albumeditor from './AlbumEditor.css';

class AlbumEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            album: {
                title: this.props.albumData.title,
                description: this.props.albumData.description
            },
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
                <div>
                    <input type="text" className="bigtext fullwidth" value={ this.state.album.title }
                        onChange={ (event) => this.setState({album: {title: event.target.value}}) }
                        onBlur={ (event) => this.props.albumTitleChangeHandler(event.target.value) } />
                </div>
                <div>
                    <textarea className="fullwidth" value={ this.state.album.description }
                        onChange={ (event) => this.setState({album: {description: event.target.value}}) }
                        onBlur={ (event) => this.props.albumDescriptionChangeHandler(event.target.value) } />
                </div>
                <div className='albumClose' onClick={ () => this.props.closeHandler() }>CLOSE</div>
                { this.state.photos.map( photo => {
                        return (
                            <div key={ photo.id } className='photo'>
                                <div className='photoDelete' onClick={ () => this.props.deletePhotoHandler(photo.id, this) }>DELETE</div>
                                <p className='bigtext'>{ photo.title }</p>
                                <p>{ photo.description }</p>
                                <p><img className='image' src={ "photos/" + this.props.albumData.url + "/" + photo.url } /></p>
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