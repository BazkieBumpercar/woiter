import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Album from './Album';
import AddAlbum from './AddAlbum';
import AlbumViewer from './AlbumViewer';

import classes from './css/Site.css';

class Site extends React.Component {

    constructor() {
        super();
        this.state = {
            albums: [],
            thumbnails: [
                [],
            ],
            viewAlbumId: undefined,
            viewAlbumData: undefined,
            loggedIn: false
        }
    }

    componentDidMount() {
        this.reloadAlbums();
    }

    reloadAlbums() {
        fetch('api/albums')
        .then(response => { return response.json(); })
        .then(albums => {
            this.setState({ albums: albums });
            albums.map((album, index) => {
                this.fetchThumbnails(album, index);
            });
        });
    }

    fetchThumbnails(album, arrayIndex) {
        fetch('api/photos/thumbnails/' + album.id)
        .then(response => { return response.json(); })
        .then(fetchedThumbnails => {
            const thumbnailsArray = [...this.state.thumbnails];
            thumbnailsArray[arrayIndex] = fetchedThumbnails.map((item) => {return 'photos/' + album.url + '/' + item});
            this.setState({ thumbnails: thumbnailsArray });
        });
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
            <AlbumViewer
                key={ this.state.viewAlbumId }
                albumData={ this.state.viewAlbumData }
                closeHandler={ () => this.closeAlbumViewer() }
            />
        : undefined;

        return (
            <div className='content'>
                <div className='albums'>
                    { this.state.albums.map((album, index) => {
                        return (
                            <Album key={ album.id }
                                album={ album }
                                thumbnails={ this.state.thumbnails[index] }
                                clickHandler={ () => this.viewAlbum(album.id) }
                            />
                        );
                    }) }
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
