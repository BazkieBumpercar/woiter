import React, { Component } from 'react'

//import classes from '/app.css';
import classes from './AlbumViewer.css';

class AlbumViewer extends React.Component {

    constructor(props) {
        super(props);
        this.albumData = props.albumData;
        this.closeHandler = props.onClose;
        this.state = {
            albumData: props.albumData,
            photos: []
        }
    }

    componentDidMount() {
        this.fetchPhotos(this.state.albumData.id);
    }

    fetchPhotos(albumId) {
        fetch('api/photos/' + albumId)
            .then(response => { return response.json(); } )
            .then(photos => {
                    this.setState({ photos: photos })
                  });
    }

    handleClose() {
        if (this.closeHandler != undefined) {
            this.setState({ photos: [] });
            this.closeHandler();
        }
    }

    render() {
        return (
            <div className='albumViewer'>
                <div className='bigtext inline'>{ this.state.albumData.title }</div>
                <div className='close' onClick={ () => this.handleClose() }>CLOSE</div>
                { this.state.photos.map( item => {
                        return (
                            <div key={ item.id } className='photo'>
                                <p className='bigtext'>{ item.title }</p><p>{ item.description }</p>
                            </div>
                        )
                    }
                )}
            </div>
        );
    }

}

export default AlbumViewer;