import React, { Component } from 'react';

class AddAlbum extends React.Component {

    handleClick() {
        this.props.onAddAlbum();
    }

    render() {
        return(
            <div className='album' onClick={ () => this.handleClick() }>
                <p style={{fontWeight: 'bold'}}>
                    <a href="#">Add a new album</a>
                </p>
            </div>
        );
    }

}

export default AddAlbum;