import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import request from 'superagent';

import Album from './Album';
import AddAlbum from './AddAlbum';
import AlbumEditor from './AlbumEditor';

import classes from './Admin.css';

class Admin extends React.Component {

    constructor() {
        super();
        this.state = {
            albums: [],
            viewAlbumId: undefined,
            viewAlbumData: undefined,
            loggedIn: true
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

    deleteAlbum(albumId) {
        fetch('api/album/' + albumId, {
            method: 'delete'
        })
        .then(albumId == this.state.viewAlbumId && this.closeAlbumViewer())
        .then(this.reloadAlbums());
    }

    deletePhoto(photoId, senderComponent) {
        fetch('api/photo/' + photoId, {
            method: 'delete'
        })
        .then(senderComponent.fetchPhotos(this.state.viewAlbumId));
        //.then(albumId == this.state.viewAlbumId && this.closeAlbumViewer())
        //.then(this.reloadAlbums());
    }

    addAlbum() {
        fetch('api/album', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            body: JSON.stringify({
                //'_token': '{{ csrf_token() }}',
                'title': 'Nieuwe album',
                'description': 'Omschrijfle',
                'published': false
            })
        })
        .then(response => { return response.json(); } )
        .then(response => this.viewAlbum(response['id']))
        //.then(response => console.log(response))
        .then(this.reloadAlbums())
        //.then(handleAlbumClick(response => ));
    }

    closeAlbumViewer() {
        this.setState({
            viewAlbumId: undefined,
            viewAlbumData: undefined
        });
    }

    albumAddPhotos(files, senderComponent) {
        console.log(files);
        let count = 0;
        const reload = () => senderComponent.fetchPhotos(this.state.viewAlbumId);
        files.forEach((image) => {
            //console.log(image);

            // upload photo data
            let upload = request.post('api/photo_imagedata')
                .field('imagedata', image)
                .field('directory', this.state.viewAlbumData['url'])
                .field('filename', image['name'])

            // upload metadata to database
            .then(
                fetch('api/photo', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'//, multipart/form-data',
                        //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    body: JSON.stringify({
                        //'_token': '{{ csrf_token() }}',
                        'title': image['name'].substring(0, image['name'].lastIndexOf('.')),
                        'album_id': this.state.viewAlbumId,
                        'description': 'Omschrijfle',
                        'location': 'Oberon',
                        'url': image['name'],
                        'published': false,
                    })
                })

            )//.then(response => { return response.json(); })
            //.then(window.URL.revokeObjectURL(image.preview))
            //.then(() => senderComponent.fetchPhotos(this.state.viewAlbumId));

            count++;
            if (count === files.length) reload();
        }

        );//.then(() => senderComponent.fetchPhotos(this.state.viewAlbumId));

    }

    renderAlbums() {

        const albumEditor = (this.state.viewAlbumId != undefined) ?
            <AlbumEditor key={this.state.viewAlbumId} albumData={this.state.viewAlbumData}
                closeHandler={ () => this.closeAlbumViewer() }
                addPhotosHandler={ (files, senderComponent) => this.albumAddPhotos(files, senderComponent) }
                deletePhotoHandler={ (photoId, senderComponent) => this.deletePhoto(photoId, senderComponent) }
            />
            : undefined;

        return (
            <div className='content'>
                <div className='albums'>
                    { this.state.albums.map(album => {
                            return (
                                <Album key={album.id} album={album} clickHandler={ () => this.viewAlbum(album.id) } loggedIn={ this.state.loggedIn } deleteHandler={ () => this.deleteAlbum(album.id) } />
                            )
                        }
                    )}
                    { this.state.loggedIn ? <AddAlbum key='0' onAddAlbum={ () => this.addAlbum() } /> : null }
                </div>
                { albumEditor }
            </div>
        );
    }

    render() {
        return(
            this.renderAlbums()
        );
    }

}

export default Admin;

if (document.getElementById('root')) {
    ReactDOM.render(<Admin />, document.getElementById('root'));
}
