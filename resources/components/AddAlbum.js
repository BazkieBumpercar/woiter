import React, { Component } from 'react';

class AddAlbum extends React.Component {

    handleClick() {
        this.props.onAddAlbum();
    }

    render() {
        return(
            <div className='album' onClick={ () => this.handleClick() }>
                {/*<p style={{fontWeight: 'bold', textDecoration: 'underline'}}>*/}
                    ADD NEW ALBUM
            </div>
        );
    }

}

export default AddAlbum;