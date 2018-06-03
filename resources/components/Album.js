import React, { Component } from 'react';

class Album extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.album) {
            return (<div className='album'><p className='bigtext'>ALBUM NO EXIST</p></div>);
        }

        return (
            <div className='album' onClick={ () => this.props.clickHandler() } key={ this.props.album.id } >
                <p className='bigtext'>{  this.props.album.title }</p>
                <p>{ this.props.album.description }</p>
                { this.props.loggedIn && <div className='albumDelete' onClick={ proxy => { proxy.stopPropagation(); this.props.deleteHandler(); } }>DELETE</div> }
            </div>
        );
    }

}

export default Album;
