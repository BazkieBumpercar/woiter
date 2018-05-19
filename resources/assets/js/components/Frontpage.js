import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Album from './Album';
import AddAlbum from './AddAlbum';

class Frontpage extends React.Component {

    constructor() {
        super();
        this.state = {
            albums: [],
        }
    }

    componentDidMount() { this.reloadAlbums(); }

    reloadAlbums() {
        fetch('api/albums')
            .then(response => { return response.json(); })
            .then(albums => { this.setState({ albums: albums }); });
    }

    handleAlbumClick(albumId) {
        var album = fetch('api/album' + albumId)
        .then(response => { return response.json(); })
        .then(album => alert("bliep " + album.title));
    }

    addAlbum() {
        //alert($('meta[name="csrf-token"]').attr('content'));
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

    renderAlbums() {
        return this.state.albums.map(album => {
            return (
                <Album key={album.id} album={album} onClick={ () => this.handleAlbumClick(album.id) } />
            );
        }).concat(<AddAlbum key='0' onAddAlbum={ () => this.addAlbum() } />);
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
