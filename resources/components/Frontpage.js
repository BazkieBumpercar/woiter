import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Album from './Album';
import AddAlbum from './AddAlbum';
import AlbumViewer from './AlbumViewer';

import classes from './Frontpage.css';

class Frontpage extends React.Component {

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

    handleAlbumClick(albumId) {
        var album = fetch('api/album/' + albumId)
        .then(response => { return response.json(); })
        .then(album => this.setState({
            viewAlbumId: albumId,
            viewAlbumData: album
        }));
    }

    addAlbum() {
        fetch('api/albums', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            body: JSON.stringify({
                '_token': '{{ csrf_token() }}',
                'title': 'Nieuwe album',
                'description': 'Omschrijfle',
                'published': false
            })
        }).then(response => { return response.json(); })
        .then(this.reloadAlbums());
    }

    handleAlbumViewerClose() {
        this.setState({
            viewAlbumId: undefined,
            viewAlbumData: undefined
        });
    }

    renderAlbums() {

        const albumViewer = (this.state.viewAlbumId != undefined) ?
            <AlbumViewer key={this.state.viewAlbumId} albumData={this.state.viewAlbumData} onClose={ () => this.handleAlbumViewerClose() } />
            : undefined;

        return (
            <div className='content'>
                <div className='albums'>
                    { this.state.albums.map(album => {
                            return (
                                <Album key={album.id} album={album} onClick={ () => this.handleAlbumClick(album.id) } />
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

export default Frontpage;

if (document.getElementById('root')) {
    ReactDOM.render(<Frontpage />, document.getElementById('root'));
}
