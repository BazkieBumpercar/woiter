import React, { Component } from 'react';

//const Album = ({ album }) => {
class Album extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.album) {
            return (<div className='album'><p className='bigtext'>ALBUM NO EXIST</p></div>);
        }

        return (
            <div className='album' onClick={ () => this.props.onClick() } key={ this.props.album.id } >
                <p className='bigtext'>{  this.props.album.title }</p>
                <p>{ this.props.album.description }</p>
            </div>
        );
    }

}

export default Album;
