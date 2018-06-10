import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router'

import Album from './Album';
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
        fetch('api/album/' + albumId)
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
            <div className='wrapper'>
                <div className='header'>
                    <div className='title'>
                        <h1 onClick={ () => this.closeAlbumViewer() }>Wouter Grevink <span style={{ color: 'rgba(0, 0, 0, 0.4)' }}>fotografie</span></h1>
                    </div>
                    <div className='flexfiller'></div>
                    <div className='social'>
                        <a href="http://www.facebook.com/woiter" target='_blank'><img src='images/icons/icon_fb.png' /></a>&nbsp;
                        <a href="http://instagram.com/woiter" target='_blank'><img src='images/icons/icon_instagram.png' /></a>&nbsp;
                        <a href="https://www.flickr.com/photos/93474006@N02/" target='_blank'><img src='images/icons/icon_flickr.png' /></a>&nbsp;
                        <a href="http://woiter.zoom.nl/" target='_blank'><img src='images/icons/icon_zoomnl.png' /></a>
                    </div>
                </div>
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
                    </div>
                    { albumViewer }
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

export default Site;

if (document.getElementById('root')) {
    ReactDOM.render(<Site />, document.getElementById('root'));
}
