import React, { Component } from 'react';

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDelete: false
        }
    }

    render() {
        if (!this.props.album) {
            return (<div className='album'><p className='bigtext'>ALBUM NO EXIST</p></div>);
        }

        return (
            <div className='album' onClick={ () => this.props.clickHandler() } key={ this.props.album.id } >
                <p className='bigtext'>{  this.props.album.title }</p>
                <p>{ this.props.album.description }</p>
                { (this.props.loggedIn && this.state.confirmDelete == false) && <div className='albumDelete' onClick={ proxy => { proxy.stopPropagation(); this.setState({confirmDelete: true}); } }>DELETE</div> }
                { (this.props.loggedIn && this.state.confirmDelete == true) && <div className='albumDelete' onClick={ proxy => { proxy.stopPropagation(); this.props.deleteHandler(); } } onMouseOut={ () => this.setState({confirmDelete: false}) }>R U SURE?!</div> }
            </div>
        );
    }

}

export default Album;
