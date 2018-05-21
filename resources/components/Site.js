import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Album from './Album';
import AddAlbum from './AddAlbum';
import AlbumViewer from './AlbumViewer';

import classes from './Site.css';

class Site extends React.Component {

    constructor() {
        super();
        this.state = {
            albums: [],
            viewAlbumId: undefined,
            viewAlbumData: undefined,
            loggedIn: false
        }
    }

    componentDidMount() { this.reloadAlbums(); }

    reloadAlbums() {
        fetch('api/albums')
            .then(response => { return response.json(); })
            .then(albums => { this.setState({ albums: albums }); });
    }

    viewAlbum(albumId) {
        var album = fetch('api/album/' + albumId)
        .then(response => { return response.json(); })
        .then(album => this.setState({
            viewAlbumId: albumId,
            viewAlbumData: album
        }));
    }

    closeAlbumViewer() {
        this.setState({
            viewAlbumId: undefined,
            viewAlbumData: undefined
        });
    }

    renderAlbums() {

        const albumViewer = (this.state.viewAlbumId != undefined) ?
            <AlbumViewer key={this.state.viewAlbumId} albumData={this.state.viewAlbumData} closeHandler={ () => this.closeAlbumViewer() } />
            /* failed experiment
            <AlbumViewer key={ this.state.viewAlbumId }
                         albumData={ this.state.viewAlbumData }
                         photoData={ () => fetch('api/photos/' + this.state.viewalbumId).then(response => { return response.json() }) }
                         onClose={ () => this.handleAlbumViewerClose() } />
            */
            : undefined;

        return (
            <div className='content'>
                <div className='albums'>
                    { this.state.albums.map(album => {
                            return (
                                <Album key={album.id} album={album} clickHandler={ () => this.viewAlbum(album.id) } />
                            )
                        }
                    )}
                    { this.state.loggedIn ? <AddAlbum key='0' onAddAlbum={ () => this.addAlbum() } /> : null }
                </div>
                { albumViewer }
            </div>
        );
    }

    render() {
        return(
            this.renderAlbums()
        );
    }

}

export default Site;

if (document.getElementById('root')) {
    ReactDOM.render(<Site />, document.getElementById('root'));
}
