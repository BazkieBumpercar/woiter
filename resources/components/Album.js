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
            return (<div className='album'><h2>ALBUM NO EXIST</h2></div>);
        }

        return (
            <div className='album' onClick={ () => this.props.clickHandler() } key={ this.props.album.id } >
                <h2>{ this.props.album.title }</h2>
                <p>{ this.props.album.description }</p>
                <div className="thumbCollection">
                    {/*{ this.props.thumbnails != undefined && this.props.thumbnails.map((thumb, index) => {*/}
                    { this.props.thumbnails != undefined && _.sampleSize(this.props.thumbnails, 3).map((thumb, index) => {
                        return (
                           <img key={index} src={thumb} />
                        );
                    }) }
                </div>
                { (this.props.loggedIn && this.state.confirmDelete == false) && <div className='albumDelete' onClick={ proxy => { proxy.stopPropagation(); this.setState({confirmDelete: true}); } }>DELETE</div> }
                { (this.props.loggedIn && this.state.confirmDelete == true) && <div className='albumDelete' onClick={ proxy => { proxy.stopPropagation(); this.props.deleteHandler(); } } onMouseOut={ () => this.setState({confirmDelete: false}) }>R U SURE?!</div> }
            </div>
        );
    }

}

export default Album;
