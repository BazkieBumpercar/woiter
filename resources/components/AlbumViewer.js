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
                <div className='close' onClick={ () => this.props.onClose() }>CLOSE</div>
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
            </div>
        );
    }

}

export default AlbumViewer;