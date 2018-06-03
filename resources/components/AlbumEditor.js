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
            photos: [],
            confirmDelete: []
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
                  })
            .then(() => { let confirmDelete = this.state.photos.map(item => { return false; }); this.setState({confirmDelete: confirmDelete}); });
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
                { this.state.photos.map( (photo, index) => {
                        return (
                            <div key={ photo.id } className='photo'>
                                { this.state.confirmDelete[index] == false && <div className='photoDelete' onClick={ proxy => { proxy.stopPropagation(); let confirmDelete = [...this.state.confirmDelete]; confirmDelete[index] = true; this.setState({confirmDelete: confirmDelete}); } }>DELETE</div> }
                                { this.state.confirmDelete[index] == true && <div className='photoDelete' onClick={ proxy => { proxy.stopPropagation(); this.props.deletePhotoHandler(photo.id, this) } } onMouseOut={ () => { let confirmDelete = [...this.state.confirmDelete]; confirmDelete[index] = false; this.setState({confirmDelete: confirmDelete}) } }>R U SURE?!</div> }
                                {/*<div className='photoDelete' onClick={ () => this.props.deletePhotoHandler(photo.id, this) }>DELETE</div>*/}
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