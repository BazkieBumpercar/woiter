import React from 'react';
import ReactDOM from 'react-dom';

import request from 'superagent';

import Album from './Album';
import AddAlbum from './AddAlbum';
import AlbumEditor from './AlbumEditor';

import getUrlParams from '../assets/urlparams';

import classes_site from './css/Site.css';
import classes_admin from './css/Admin.css';

class Admin extends React.Component {

    constructor() {
        super();
        this.state = {
            albums: [],
            viewAlbumId: undefined,
            viewAlbumData: undefined,
        }
    }

    componentDidMount() {
        const csrf_token_meta = document.querySelector("meta[name='csrf-token']");
        this.setState({csrf_token: csrf_token_meta != null ? csrf_token_meta.getAttribute('content') : null });
        this.reloadAlbums();
    }

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
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                Authorization: 'Bearer woiterski',
                'authcode' : getUrlParams('authcode')
            }
        })
        .then(albumId == this.state.viewAlbumId && this.closeAlbumViewer())
        .then(() => this.reloadAlbums());
    }

    deletePhoto(photoId, senderComponent) {
        fetch('api/photo/' + photoId, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                Authorization: 'Bearer woiterski',
                'authcode' : getUrlParams('authcode')
            }
        })
        .then(senderComponent.fetchPhotos(this.state.viewAlbumId));
    }

    addAlbum() {
        fetch('api/album', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                Authorization: 'Bearer woiterski',
                'authcode' : getUrlParams('authcode')
            },
            body: JSON.stringify({
                'title': 'Nieuwe album',
                'description': 'Omschrijfle',
                'published': false
            })
        })
        .then(response => { return response.json() })
        .then(response => { response['id'] != undefined && this.viewAlbum(response['id']) })
        .then(() => this.reloadAlbums())
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
            request.post('api/photo_imagedata')
                .field('imagedata', image)
                .field('directory', this.state.viewAlbumData['url'])
                .field('filename', image['name'])
                .set('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'))
                .set('Authorization', 'Bearer woiterski')
                .set('authcode', getUrlParams('authcode'))

            // upload metadata to database
            .then(
                fetch('api/photo', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        Authorization: 'Bearer woiterski',
                        'authcode' : getUrlParams('authcode')
                    },
                    body: JSON.stringify({
                        'title': image['name'].substring(0, image['name'].lastIndexOf('.')),
                        'album_id': this.state.viewAlbumId,
                        'description': 'Omschrijfle',
                        'location': 'Oberon',
                        'url': image['name'],
                        'published': false,
                    })
                })
                .catch((err) => { console.log("error uploading photo metadata:" + err) })
                .then(() => {
                    count++;
                    if (count === files.length) reload();
                })

            ).catch((err) => { console.log("error uploading photo data:" + err) })//.then(response => { return response.json(); })
            //.then(window.URL.revokeObjectURL(image.preview))
            //.then(() => senderComponent.fetchPhotos(this.state.viewAlbumId));

            //count++;
            //if (count === files.length) reload();
        }

        );//.then(() => senderComponent.fetchPhotos(this.state.viewAlbumId));
    }

    albumChangeTitle(newTitle) {
        fetch('api/album/' + this.state.viewAlbumId, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                Authorization: 'Bearer woiterski',
                'authcode' : getUrlParams('authcode')
            },
            body: JSON.stringify({
                'title': newTitle
            })
        }).then(() => this.reloadAlbums());
    }

    albumChangeDescription(newDescription) {
        fetch('api/album/' + this.state.viewAlbumId, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                Authorization: 'Bearer woiterski',
                'authcode' : getUrlParams('authcode')
            },
            body: JSON.stringify({
                'description': newDescription
            })
        }).then(() => this.reloadAlbums());
    }

    photoChangeTitle(photoId, newTitle) {
        fetch('api/photo/' + photoId, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                Authorization: 'Bearer woiterski',
                'authcode' : getUrlParams('authcode')
            },
            body: JSON.stringify({
                'title': newTitle
            })
        });
    }

    photoChangeDescription(photoId, newDescription) {
        fetch('api/photo/' + photoId, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                Authorization: 'Bearer woiterski',
                'authcode' : getUrlParams('authcode')
            },
            body: JSON.stringify({
                'description': newDescription
            })
        });
    }

    renderAlbums() {

        const albumEditor = (this.state.viewAlbumId != undefined) ?
            <AlbumEditor key={this.state.viewAlbumId} albumData={this.state.viewAlbumData}
                closeHandler={ () => this.closeAlbumViewer() }
                addPhotosHandler={ (files, senderComponent) => this.albumAddPhotos(files, senderComponent) }
                deletePhotoHandler={ (photoId, senderComponent) => this.deletePhoto(photoId, senderComponent) }
                albumTitleChangeHandler={ (newTitle) => this.albumChangeTitle(newTitle) }
                albumDescriptionChangeHandler={ (newDescription) => this.albumChangeDescription(newDescription) }
                photoTitleChangeHandler={ (photoId, newTitle) => this.photoChangeTitle(photoId, newTitle) }
                photoDescriptionChangeHandler={ (photoId, newDescription) => this.photoChangeDescription(photoId, newDescription) }
            />
        : undefined;

        return (
            <div className='wrapper'>
                <div className='header'>
                    <div className='title'>
                        <h1 onClick={ () => this.closeAlbumViewer() }>Admin pret</h1>
                    </div>
                </div>
                <div className='content'>
                    <div className='albums'>
                        { this.state.albums.map(album => {
                                return (
                                    <Album key={album.id}
                                        album={album}
                                        clickHandler={ () => this.viewAlbum(album.id) }
                                        deleteHandler={ () => this.deleteAlbum(album.id) } />
                                )
                            }
                        )}
                        <AddAlbum key='0' onAddAlbum={ () => this.addAlbum() } />
                    </div>
                    { albumEditor }
                </div>
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
